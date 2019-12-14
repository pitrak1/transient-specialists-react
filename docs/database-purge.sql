DELETE FROM Handles;
DELETE FROM Events;
DELETE FROM Equipments;
DELETE FROM ItemGroupsModels;
DELETE FROM Models;
DELETE FROM ItemGroups;
DELETE FROM Oems;
DELETE FROM Types;

SELECT setval('handles_id_seq', 1);
SELECT setval('events_id_seq', 1);
SELECT setval('equipments_id_seq', 1);
SELECT setval('itemgroupsmodels_id_seq', 1);
SELECT setval('models_id_seq', 1);
SELECT setval('itemgroups_id_seq', 1);
SELECT setval('oems_id_seq', 1);
SELECT setval('types_id_seq', 1);

