use db_perqara;

create table perqara_lawyers (
  perqara_lawyers_id binary(16) DEFAULT (uuid_to_bin(uuid())) NOT NULL,
  perqara_lawyers_name varchar(255),
  perqara_lawyers_experience int(2) UNSIGNED NOT NULL,
  perqara_lawyers_location_coordinate POINT NOT NULL,
  perqara_lawyers_office_address text,
  perqara_lawyers_created_at datetime,
  perqara_lawyers_updated_at datetime,
  perqara_lawyers_deleted_at datetime DEFAULT NULL,
  primary key(perqara_lawyers_id),
  SPATIAL INDEX (perqara_lawyers_location_coordinate),
  INDEX(perqara_lawyers_deleted_at),
  FULLTEXT INDEX(perqara_lawyers_name)
);


INSERT INTO db_perqara.perqara_lawyers
(perqara_lawyers_name, perqara_lawyers_experience, perqara_lawyers_location_coordinate, perqara_lawyers_created_at,perqara_lawyers_updated_at, perqara_lawyers_deleted_at)
VALUES
 ('Lawyer Tebet Test', 10, POINT(-6.2407489,106.8314016), NOW(), NOW(), NULL ),
 ('Lawyer Sudirman Test', 2, POINT(-6.2216452,106.8092608), NOW(), NOW(), NULL),
 ('Lawyer Duren Sawit Test', 2, POINT(-6.235154, 106.909938), NOW(), NOW(), NULL),
 ('Lawyer Cisauk', 2, POINT(-6.300904, 106.651164), NOW(), NOW(), NULL);
