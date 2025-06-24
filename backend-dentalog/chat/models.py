from django.db import models

# Create your models here.

class ChatParticipations(models.Model):
    user = models.OneToOneField('Users', models.DO_NOTHING, primary_key=True)
    chat = models.ForeignKey('Chats', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'chat_participations'
        db_table_comment = 'table of users in chats'

class Chats(models.Model):
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()
    title = models.CharField()
    is_active = models.BooleanField()
    id = models.FloatField(primary_key=True)

    class Meta:
        managed = False
        db_table = 'chats'
        db_table_comment = 'Table of chats between wardens and doctors'

class Messages(models.Model):
    message_id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey('Users', models.DO_NOTHING, blank=True, null=True)
    send_at = models.DateTimeField()
    is_read = models.BooleanField()
    type = models.SmallIntegerField()
    content = models.CharField(blank=True, null=True)
    chat = models.ForeignKey(Chats, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'messages'
        db_table_comment = 'table of messages'

