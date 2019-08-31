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


INSERT INTO Events (status, equipment_id)
VALUES ('Event 1', 1);

INSERT INTO Events (status, equipment_id)
VALUES ('Event 2', 2);

INSERT INTO Events (status, equipment_id)
VALUES ('Event 3', 3);

INSERT INTO Events (status, equipment_id)
VALUES ('Event 4', 4);

INSERT INTO Events (status, equipment_id)
VALUES ('Event 5', 4);

INSERT INTO Events (status, equipment_id)
VALUES ('Event 6', 5);

INSERT INTO Events (status, equipment_id)
VALUES ('Event 7', 5);

INSERT INTO Events (status, equipment_id)
VALUES ('Event 8', 5);

INSERT INTO Events (status, equipment_id)
VALUES ('Event 9', 6);

INSERT INTO Events (status, equipment_id)
VALUES ('Event 10', 6);

INSERT INTO Events (status, equipment_id)
VALUES ('Event 11', 6);

INSERT INTO Events (status, equipment_id)
VALUES ('Event 12', 6);