# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models


FLAT_CHOICES = (
    ('free', 'free'),
    ('reserved', 'reserved'),
    ('sold', 'sold')
)

class Flats(models.Model):
    section = models.ForeignKey('Sections', models.DO_NOTHING, related_name='flats')
    floor = models.IntegerField()
    flat_number = models.IntegerField()
    status = models.CharField(max_length=255, blank=True, null=True, default='free', choices=FLAT_CHOICES)
    price = models.IntegerField(blank=True, null=True)
    size = models.FloatField(blank=True, null=True)
    rooms = models.IntegerField(blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True, auto_now=True)
    updated_at = models.DateTimeField(blank=True, null=True, auto_now=True)

    class Meta:
        managed = False
        db_table = 'flats'


class Houses(models.Model):
    project = models.ForeignKey('Projects', models.DO_NOTHING, related_name='houses')
    name = models.TextField()
    address = models.TextField()
    built_year = models.IntegerField(validators=[MinValueValidator(800), MaxValueValidator(2050)])
    built_quarter = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(4)])
    created_at = models.DateTimeField(blank=True, null=True, auto_now=True)
    updated_at = models.DateTimeField(blank=True, null=True, auto_now=True)

    class Meta:
        managed = False
        db_table = 'houses'


class Projects(models.Model):
    name = models.TextField()
    coords = models.TextField()
    district = models.TextField()
    website = models.TextField()
    created_at = models.DateTimeField(blank=True, null=True, auto_now=True)
    updated_at = models.DateTimeField(blank=True, null=True, auto_now=True)

    class Meta:
        managed = False
        db_table = 'projects'


class Sections(models.Model):
    house = models.ForeignKey(Houses, models.DO_NOTHING, related_name='sections')
    number = models.IntegerField()
    floors = models.IntegerField()
    flats_on_floor = models.IntegerField()
    starting_flat_number = models.IntegerField()
    created_at = models.DateTimeField(blank=True, null=True, auto_now=True)
    updated_at = models.DateTimeField(blank=True, null=True, auto_now=True)

    class Meta:
        managed = False
        db_table = 'sections'


class Users(models.Model):
    login = models.TextField()
    password = models.TextField()
    api_token = models.TextField()
    created_at = models.DateTimeField(blank=True, null=True, auto_now=True)
    updated_at = models.DateTimeField(blank=True, null=True, auto_now=True)

    class Meta:
        managed = False
        db_table = 'users'
