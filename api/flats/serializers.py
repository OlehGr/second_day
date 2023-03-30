from rest_framework import serializers, exceptions

from flats.models import Projects, Houses, Sections, Flats


class FlatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flats
        fields = '__all__'


def valid_int_list(value):
    if not all(isinstance(value_item, int) for value_item in value):
        raise serializers.ValidationError('Invalid flats list format')


class FlatsUpdateSerializer(FlatSerializer):
    flats = serializers.ListField(validators=[valid_int_list], allow_null=False)

    class Meta(FlatSerializer.Meta):
        fields = ('flats', 'size', 'rooms', 'price')


class OneFlatUpdateSerializer(FlatSerializer):
    class Meta(FlatSerializer.Meta):
        fields = ('size', 'rooms', 'price')

class FlatUpdateSerializer(FlatSerializer):
    class Meta(FlatSerializer.Meta):
        fields = ('status',)


def check_existing_house(value):
    try:
        house = Houses.objects.get(id=value)
    except Houses.DoesNotExist:
        raise exceptions.ValidationError({"houese_id": f"House with id {value} do not exist"})

class SectionCreateSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    house_id = serializers.IntegerField(validators=[check_existing_house])
    number = serializers.IntegerField()
    floors = serializers.IntegerField()
    flats_on_floor = serializers.IntegerField()
    starting_flat_number = serializers.IntegerField()
    created_at = serializers.DateTimeField(read_only=True)
    updated_at = serializers.DateTimeField(read_only=True)

    def create(self, validated_data):
        return Sections.objects.create(**validated_data)




class SectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sections
        fields = '__all__'

class SectionFlatsSerializer(FlatSerializer):

    class Meta(FlatSerializer.Meta):
        fields = ("id",
          "flat_number",
          "floor",
          "size",
          "rooms",
          "price",
          "status",
)

class SectionDetailSerializer(SectionSerializer):
    flats = SectionFlatsSerializer(read_only=True, many=True)

    class Meta(SectionSerializer.Meta):
       fields = ('id', 'number', 'flats')


class HouseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Houses
        fields = '__all__'


def check_existing_project(value):
    try:
        project = Projects.objects.get(id=value)
    except Projects.DoesNotExist:
        raise exceptions.ValidationError({"project_id": f"Project with id {value} do not exist"})


class HouseCreateSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    project_id = serializers.IntegerField(validators=[check_existing_project])
    name = serializers.CharField(max_length=255)
    address = serializers.CharField(max_length=255)
    built_year = serializers.IntegerField(min_value=800, max_value=2050)
    built_quarter = serializers.IntegerField(min_value=1, max_value=4)
    created_at = serializers.DateTimeField(read_only=True)
    updated_at = serializers.DateTimeField(read_only=True)

    def create(self, validated_data):
        return Houses.objects.create(**validated_data)


class HouseSectionsSerializer(SectionSerializer):
    class Meta(SectionSerializer.Meta):
        fields = ('id', 'number')


class HouseDetailSerializer(HouseSerializer):
    sections = HouseSectionsSerializer(many=True, read_only=True)

    class Meta(HouseSerializer.Meta):
        fields = ('id', 'name', 'address', 'built_year', 'built_quarter', 'sections')

class HouseFlatSectionSerializer(SectionSerializer):
    class Meta(SectionSerializer.Meta):
        fields = ('id', 'number', 'floors', 'flats_on_floor')

class HouseFlatSerializer(serializers.ModelSerializer):
    section = HouseFlatSectionSerializer(read_only=True)

    class Meta(FlatSerializer.Meta):
        model = Flats
        fields = ('id', 'flat_number', 'floor', 'size', 'rooms', 'price', 'status', 'section')



def coords_format(value):
    coords_values = value.split(', ')

    try:
        if len(coords_values) == 2 and isinstance(coords_values, list):
            float_coords = [float(crood) for crood in coords_values]
        else:
            raise serializers.ValidationError('Invalid coords format')
    except ValueError as error:
        raise serializers.ValidationError('Invalid coords format')


class ProjectCreateSerializer(serializers.ModelSerializer):
    coords = serializers.CharField(max_length=255, allow_blank=False, allow_null=False, validators=[coords_format])
    district = serializers.CharField(max_length=255)
    website = serializers.URLField(max_length=255)


    class Meta:
        model = Projects
        fields = ('id', 'name', 'coords', 'district', 'website',)


class ProjectHouses(HouseSerializer):
    class Meta(HouseSerializer.Meta):
        fields = ('id', 'name')


class ProjectDetailSerializer(ProjectCreateSerializer):
    houses = ProjectHouses(many=True, read_only=True)

    class Meta(ProjectCreateSerializer.Meta):
        fields = ('id', 'name', 'coords', 'district', 'website', 'houses', )

