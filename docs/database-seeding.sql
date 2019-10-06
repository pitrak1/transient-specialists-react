INSERT INTO Types(name)
VALUES ('Type abc 1');

INSERT INTO Types(name)
VALUES ('Type ab 2');

INSERT INTO Types(name)
VALUES ('Type a 3');


INSERT INTO Oems(name)
VALUES ('OEM abc 1');

INSERT INTO Oems(name)
VALUES ('OEM ab 2');

INSERT INTO Oems(name)
VALUES ('OEM a 3');


INSERT INTO Models(name, oem_id)
VALUES ('Model abcdef 1', 1);

INSERT INTO Models(name, oem_id)
VALUES ('Model abcde 2', 2);

INSERT INTO Models(name, oem_id)
VALUES ('Model abcd 3', 2);

INSERT INTO Models(name, oem_id)
VALUES ('Model abc 4', 3);

INSERT INTO Models(name, oem_id)
VALUES ('Model ab 5', 3);

INSERT INTO Models(name, oem_id)
VALUES ('Model a 6', 3);


INSERT INTO Equipments (serial_number, type_id, model_id)
VALUES ('Equipment abcdef 1', 1, 3);

INSERT INTO Equipments (serial_number, type_id, model_id)
VALUES ('Equipment abcde 2', 2, 3);

INSERT INTO Equipments (serial_number, type_id, model_id)
VALUES ('Equipment abcd 3', 2, 3);

INSERT INTO Equipments (serial_number, type_id, model_id)
VALUES ('Equipment abc 4', 3, 2);

INSERT INTO Equipments (serial_number, type_id, model_id)
VALUES ('Equipment ab 5', 3, 2);

INSERT INTO Equipments (serial_number, type_id, model_id)
VALUES ('Equipment a 6', 3, 1);


INSERT INTO Events (status, equipment_id, updated_at)
VALUES ('Event 1', 1, '2017-12-17 07:37:16-05');

INSERT INTO Events (status, equipment_id, updated_at)
VALUES ('Event 2', 2, '2017-12-17 07:37:16-05');

INSERT INTO Events (status, equipment_id, updated_at)
VALUES ('Event 3', 3, '2017-12-17 07:37:16-05');

INSERT INTO Events (status, equipment_id, updated_at)
VALUES ('Event 4', 4, '2017-12-17 07:37:16-05');

INSERT INTO Events (status, equipment_id, updated_at)
VALUES ('Event 5', 4, '2018-12-17 07:37:16-05');

INSERT INTO Events (status, equipment_id, updated_at)
VALUES ('Event 6', 5, '2019-12-17 07:37:16-05');

INSERT INTO Events (status, equipment_id, updated_at)
VALUES ('Event 7', 5, '2017-12-17 07:37:16-05');

INSERT INTO Events (status, equipment_id, updated_at)
VALUES ('Event 8', 5, '2018-12-17 07:37:16-05');

INSERT INTO Events (status, equipment_id, updated_at)
VALUES ('Event 9', 6, '2018-06-17 07:37:16-05');

INSERT INTO Events (status, equipment_id, updated_at)
VALUES ('Event 10', 6, '2017-04-17 07:37:16-05');

INSERT INTO Events (status, equipment_id, updated_at)
VALUES ('Event 11', 6, '2019-09-17 07:37:16-05');

INSERT INTO Events (status, equipment_id, updated_at)
VALUES ('Event 12', 6, '2018-12-17 07:37:16-05');