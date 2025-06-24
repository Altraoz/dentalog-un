from django.db import models

class InventoryItems(models.Model):
    id = models.BigAutoField(primary_key=True)
    created_at = models.DateTimeField()
    last_update = models.DateTimeField(blank=True, null=True)
    name = models.CharField(blank=True, null=True)
    description = models.CharField(blank=True, null=True)
    stock = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    unit = models.ForeignKey('Units', models.DO_NOTHING, db_column='unit', blank=True, null=True)
    created_by = models.ForeignKey('Users', models.DO_NOTHING, db_column='created_by', blank=True, null=True)
    is_activate = models.BooleanField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'inventory_items'
        db_table_comment = 'table of items on inventories'

class InventoryMovements(models.Model):
    id = models.BigAutoField(primary_key=True)
    created_at = models.DateTimeField()
    item = models.ForeignKey(InventoryItems, models.DO_NOTHING, blank=True, null=True)
    movement_type = models.TextField(blank=True, null=True)  # This field type is a guess.
    amount = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    reason = models.CharField(blank=True, null=True)
    made_by = models.ForeignKey('Users', models.DO_NOTHING, db_column='made_by', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'inventory_movements'

class ItemCategories(models.Model):
    id = models.BigAutoField(primary_key=True)
    created_at = models.DateTimeField()
    name = models.CharField()
    description = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'item_categories'

class ItemCategoriesRelation(models.Model):
    pk = models.CompositePrimaryKey('item_id', 'category_id')
    item = models.ForeignKey(InventoryItems, models.DO_NOTHING)
    category = models.ForeignKey(ItemCategories, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'item_categories_relation'

class Units(models.Model):
    code = models.CharField(unique=True, max_length=50)
    name = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'units'
