create table lists(id integer primary key, name text);
create table items(id integer primary key, list_id integer not null, name text not null);

insert into lists values(1, "animals");
insert into items (list_id, name) values (1, "dog");
insert into items (list_id, name) values (1, "cat");
insert into items (list_id, name) values (1, "zebra");
insert into items (list_id, name) values (1, "lion");
insert into items (list_id, name) values (1, "dogs");
insert into items (list_id, name) values (1, "doggie");

insert into lists values(2, "databases");
insert into items (list_id, name) values (2, "postgresql");
insert into items (list_id, name) values (2, "sqlite");
insert into items (list_id, name) values (2, "mysql");
