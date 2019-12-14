INSERT INTO Types(name) VALUES ('Type abc 1');
INSERT INTO Types(name) VALUES ('Type ab 2');
INSERT INTO Types(name) VALUES ('Type a 3');
SELECT * FROM Types;

INSERT INTO Oems(name) VALUES ('OEM abc 1');
INSERT INTO Oems(name) VALUES ('OEM ab 2');
INSERT INTO Oems(name) VALUES ('OEM a 3');
SELECT * FROM Oems;


INSERT INTO ItemGroups (name) VALUES('First');
INSERT INTO ItemGroups (name) VALUES('Second');
INSERT INTO ItemGroups (name) VALUES('Third');
SELECT * FROM ItemGroups;


INSERT INTO Models(name, oem_id) VALUES ('Model abcdef 1', 2);
INSERT INTO Models(name, oem_id) VALUES ('Model abcde 2', 3);
INSERT INTO Models(name, oem_id) VALUES ('Model abcd 3', 3);
INSERT INTO Models(name, oem_id) VALUES ('Model abc 4', 4);
INSERT INTO Models(name, oem_id) VALUES ('Model ab 5', 4);
INSERT INTO Models(name, oem_id) VALUES ('Model a 6', 4);
SELECT * FROM Models;


INSERT INTO ItemGroupsModels(model_id, item_group_id) VALUES (2, 2);
INSERT INTO ItemGroupsModels(model_id, item_group_id) VALUES (3, 2);
INSERT INTO ItemGroupsModels(model_id, item_group_id) VALUES (4, 2);
INSERT INTO ItemGroupsModels(model_id, item_group_id) VALUES (5, 2);
INSERT INTO ItemGroupsModels(model_id, item_group_id) VALUES (6, 4);
INSERT INTO ItemGroupsModels(model_id, item_group_id) VALUES (7, 4);
SELECT * FROM ItemGroupsModels;


INSERT INTO Equipments (serial_number, type_id, model_id) VALUES ('Equipment abcdef 1', 2, 4);
INSERT INTO Equipments (serial_number, type_id, model_id) VALUES ('Equipment abcde 2', 3, 4);
INSERT INTO Equipments (serial_number, type_id, model_id) VALUES ('Equipment abcd 3', 3, 4);
INSERT INTO Equipments (serial_number, type_id, model_id) VALUES ('Equipment abc 4', 4, 3);
INSERT INTO Equipments (serial_number, type_id, model_id) VALUES ('Equipment ab 5', 4, 3);
INSERT INTO Equipments (serial_number, type_id, model_id) VALUES ('Equipment a 6', 4, 2);
SELECT * FROM Equipments;


INSERT INTO Events (status, equipment_id, updated_at) VALUES ('Event 1', 2, '2017-12-17 07:37:16-05');
INSERT INTO Events (status, equipment_id, updated_at) VALUES ('Event 2', 3, '2017-12-17 07:37:16-05');
INSERT INTO Events (status, equipment_id, updated_at) VALUES ('Event 3', 4, '2017-12-17 07:37:16-05');
INSERT INTO Events (status, equipment_id, updated_at) VALUES ('Event 4', 5, '2017-12-17 07:37:16-05');
INSERT INTO Events (status, equipment_id, updated_at) VALUES ('Event 5', 5, '2018-12-17 07:37:16-05');
INSERT INTO Events (status, equipment_id, updated_at) VALUES ('Event 6', 6, '2019-12-17 07:37:16-05');
INSERT INTO Events (status, equipment_id, updated_at) VALUES ('Event 7', 6, '2017-12-17 07:37:16-05');
INSERT INTO Events (status, equipment_id, updated_at) VALUES ('Event 8', 6, '2018-12-17 07:37:16-05');
INSERT INTO Events (status, equipment_id, updated_at) VALUES ('Event 9', 7, '2018-06-17 07:37:16-05');
INSERT INTO Events (status, equipment_id, updated_at) VALUES ('Event 10', 7, '2017-04-17 07:37:16-05');
INSERT INTO Events (status, equipment_id, updated_at) VALUES ('Event 11', 7, '2019-09-17 07:37:16-05');
INSERT INTO Events (status, equipment_id, updated_at) VALUES ('Event 12', 7, '2018-12-17 07:37:16-05');
SELECT * FROM Events;


INSERT INTO Handles (handle, item_group_id) VALUES ('http://asdf1', 2);
INSERT INTO Handles (handle, item_group_id) VALUES ('http://asdf2', 2);
INSERT INTO Handles (handle, item_group_id) VALUES ('http://asdf3', 2);
INSERT INTO Handles (handle, item_group_id) VALUES ('http://asdf4', 3);
INSERT INTO Handles (handle, item_group_id) VALUES ('http://asdf5', 3);
INSERT INTO Handles (handle, item_group_id) VALUES ('http://asdf6', 3);
SELECT * FROM Handles;
