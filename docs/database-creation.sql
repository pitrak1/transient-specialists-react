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

CREATE TABLE Models
(
  id SERIAL PRIMARY KEY,
  name varchar(255) NOT NULL,
  oem_id int REFERENCES Oems(id)
);

CREATE UNIQUE INDEX idx_model_name ON Models(lower(name));

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
