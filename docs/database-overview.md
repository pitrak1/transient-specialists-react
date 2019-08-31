Equipments {
id: int, not null, primary key,
serial_number: nvarchar, null,
notes: nvarchar, null,
current_event: int, not null,
cal_company: nvarchar, null,
cal_due: nvarchar, null,
type_id: int, not null, foreign key,
model_id: int, not null, foreign key,
}

Events {
id: int, not null, primary key,
status: nvarchar, null,
time: datetime, not null,
equipment_id: int, not null, foreign key,
company_notes: nvarchar, null,
start_date: datetime, null,
end_date: datetime, null,
}

Models {
id: int, not null, primary key,
name: nvarchar, null,
oem_id: int, not null, foreign key,
}

Oems {
id: int, not null, primary key,
name: nvarchar, null,
}

Types {
id: int, not null, primary key,
name: nvarchar null,
}
