CREATE TABLE Types
(
  id SERIAL PRIMARY KEY,
  name varchar(255) NOT NULL
);
CREATE UNIQUE INDEX idx_type_name ON Types(lower(name));

CREATE TABLE Oems
(
  id SERIAL PRIMARY KEY,
  name varchar(255) NOT NULL
);
CREATE UNIQUE INDEX idx_oem_name ON Oems(lower(name));

CREATE TABLE ItemGroups
(
  id SERIAL PRIMARY KEY,
  name varchar(255) NOT NULL
);
CREATE UNIQUE INDEX idx_item_groups_name ON ItemGroups(lower(name));

CREATE TABLE Models
(
  id SERIAL PRIMARY KEY,
  name varchar(255) NOT NULL,
  oem_id int REFERENCES Oems(id),
);
CREATE UNIQUE INDEX idx_model_name ON Models(lower(name));

CREATE TABLE ItemGroupsModels
(
  id SERIAL PRIMARY KEY,
  model_id int REFERENCES Models(id),
  item_group_id int REFERENCES ItemGroups(id)
)

CREATE TABLE Equipments
(
  id SERIAL PRIMARY KEY,
  serial_number varchar(255) NOT NULL,
  notes varchar(255),
  current_event int,
  cal_company varchar(255),
  cal_due varchar(255),
  type_id int REFERENCES Types(id),
  model_id int REFERENCES Models(id)
);
CREATE UNIQUE INDEX idx_equipment_serial_number ON Equipments(lower(serial_number));

CREATE TABLE Events
(
  id SERIAL PRIMARY KEY,
  status varchar(255),
  job_number varchar(255),
  company_notes varchar(255),
  start_date timestamptz,
  end_date timestamptz,
  updated_at timestamptz,
  equipment_id int REFERENCES Equipments(id)
);

CREATE VIEW RecentEvents AS
SELECT
	y.id AS id,
	y.status AS status,
	y.job_number AS job_number,
	y.company_notes AS company_notes,
	y.start_date AS start_date,
	y.end_date AS end_date,
  y.equipment_id AS equipment_id
FROM (
	SELECT
		x.id,
		x.status,
		x.job_number,
		x.company_notes,
		x.start_date,
		x.end_date,
		x.updated_at,
		x.equipment_id,
		ROW_NUMBER() OVER(
		PARTITION BY x.equipment_id ORDER BY x.updated_at DESC
		) AS rk
	FROM Events x
) y
WHERE y.rk = 1;

CREATE TABLE Handles
(
  id SERIAL PRIMARY KEY,
  handle varchar(255) NOT NULL,
  item_group_id int REFERENCES ItemGroups(id)
);

CREATE TABLE Files
(
  id SERIAL PRIMARY KEY,
  name varchar(255) NOT NULL,
  contents text NOT NULL,
  equipment_id int REFERENCES Equipments(id)
);
