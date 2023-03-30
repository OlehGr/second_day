from django.db import models

# Create your models here.
class Users(models.Model):
    login = models.TextField()
    password = models.TextField()
    api_token = models.TextField()
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'users'

    @property
    def is_authenticated(self):
        return True
