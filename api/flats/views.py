from rest_framework import generics, status
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import exceptions

from flats.serializers import ProjectCreateSerializer, ProjectDetailSerializer, HouseCreateSerializer, \
    HouseDetailSerializer, \
    SectionSerializer, FlatSerializer, SectionCreateSerializer, SectionDetailSerializer, FlatsUpdateSerializer, \
    OneFlatUpdateSerializer, HouseFlatSerializer, FlatUpdateSerializer

from rest_framework.permissions import IsAuthenticated


# Create your views here.
from rest_framework.decorators import api_view, permission_classes
from flats.models import Projects, Houses, Sections, Flats


def custom_view_create(self, request, *args, **kwargs):
    serializer = self.get_serializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    self.perform_create(serializer)
    headers = self.get_success_headers(serializer.data)
    return Response({'id': serializer.data['id']}, status=status.HTTP_201_CREATED, headers=headers)


def custom_update(self, request, *args, **kwargs):
    if len(request.data.keys()) == 0:
        raise exceptions.ValidationError({"body": "Body can not be full empty"})
    partial = kwargs.pop('partial', False)
    instance = self.get_object()
    serializer = self.get_serializer(instance, data=request.data, partial=partial)
    serializer.is_valid(raise_exception=True)
    self.perform_update(serializer)

    if getattr(instance, '_prefetched_objects_cache', None):
        # If 'prefetch_related' has been applied to a queryset, we need to
        # forcibly invalidate the prefetch cache on the instance.
        instance._prefetched_objects_cache = {}

    return Response(None, status=status.HTTP_204_NO_CONTENT)


class RetrieveUpdate204View(generics.RetrieveUpdateAPIView):
    def put(self, request, *args, **kwargs):
        return custom_update(self, request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return custom_update(self, request, *args, **kwargs)



class ListCreateOnlyIdView(generics.ListCreateAPIView):
    def create(self, request, *args, **kwargs):
        return custom_view_create(self, request, *args, **kwargs)


class CreateOnlyIdView(generics.CreateAPIView):
    def create(self, request, *args, **kwargs):
        return custom_view_create(self, request, *args, **kwargs)


class ProjectCreateView(ListCreateOnlyIdView):
    queryset = Projects.objects.all()
    serializer_class = ProjectCreateSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        projects = Projects.objects.all().values()
        counted_projects = []
        for project in projects:
            free = 0
            reserved = 0
            sold = 0

            for house in Houses.objects.filter(project_id=project['id']).values():
                for section in Sections.objects.filter(house_id=house['id']).values():
                    free += Flats.objects.filter(section_id=section['id'], status='free').count()
                    reserved += Flats.objects.filter(section_id=section['id'], status='reserved').count()
                    sold += Flats.objects.filter(section_id=section['id'], status='sold').count()

            counted_projects.append({**{"id": project['id'], "name": project["name"]}, 'flat_statuses': {'free': free, 'reserved': reserved, 'sold': sold}})

        return Response(counted_projects)


class ProjectDetailView(RetrieveUpdate204View):
    queryset = Projects.objects.all()
    serializer_class = ProjectDetailSerializer
    permission_classes = [IsAuthenticated]


class HouseCreateView(CreateOnlyIdView):
    queryset = Houses.objects.all()
    serializer_class = HouseCreateSerializer
    permission_classes = [IsAuthenticated]


class HouseDetailView(RetrieveUpdate204View):
    queryset = Houses.objects.all()
    serializer_class = HouseDetailSerializer
    permission_classes = [IsAuthenticated]


def chunks(lst, n):
    result = []
    for i in range(0, len(lst), n):
        result.append(lst[i:i + n])

    return result


def create_all_flats_by_section(section_id, floors, flats_on_floor, starting_flat_number, *args, **kwargs):
        section_id, floors, flats_on_floor, starting_flat_number = map(int, (section_id, floors, flats_on_floor, starting_flat_number))

        flats_numbers = [number for number in range(starting_flat_number, starting_flat_number + (floors * flats_on_floor))]
        floor_flats = chunks(flats_numbers, flats_on_floor)

        # print(section_id, floors, flats_on_floor, starting_flat_number)

        for floor, flat_numbers in enumerate(floor_flats):
            for flat_number in flat_numbers:
                data = {
                    'section': section_id,
                    'floor': floor+1,
                    'flat_number': flat_number
                }
                serializer = FlatSerializer(data=data)
                serializer.is_valid(raise_exception=True)
                serializer.save(**serializer.validated_data)


class SectionCreateAPIView(generics.CreateAPIView):
    queryset = Sections.objects.all()
    serializer_class = SectionCreateSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        data = request.data
        serializer = SectionCreateSerializer(data=data)
        serializer.is_valid(raise_exception=True)

        new_section = serializer.save(**kwargs)

        new_section_data = SectionCreateSerializer(new_section).data

        create_all_flats_by_section(**new_section_data, section_id=new_section_data['id'])

        return Response({'id': new_section_data['id']})


class SectionDetailView(generics.RetrieveAPIView):
    queryset = Sections.objects.all()
    serializer_class = SectionDetailSerializer
    permission_classes = [IsAuthenticated]


@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def mass_flats_update(request):
    serializer = FlatsUpdateSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    data = serializer.validated_data
    for flat_id in data['flats']:
        try:
            instance = Flats.objects.get(id=flat_id)
        except Flats.DoesNotExist:
            raise exceptions.ValidationError({'flats': f"Invalid flats list - flat width id {flat_id} do not exist"})
        serializer = OneFlatUpdateSerializer(instance=instance, data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
    return Response(None, status=status.HTTP_204_NO_CONTENT)


class HouseFlatsAPIView(generics.RetrieveAPIView):
    queryset = Houses.objects.all()
    serializer_class = HouseDetailSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        house_id = serializer.data['id']

        flats = Flats.objects.filter(section_id__house_id=house_id)

        serializer = HouseFlatSerializer(flats, many=True)

        return Response({'flats': serializer.data})


class FlatUpdateView(RetrieveUpdate204View):
    queryset = Flats.objects.all()
    serializer_class = FlatUpdateSerializer
    permission_classes = [IsAuthenticated]
