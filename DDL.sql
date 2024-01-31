create table `t_users` (
	`user_no`	int				auto_increment,
  `user_id`	varchar(100)	not null,
	`user_pwd`	varchar(100)	not null,
  `user_name`	varchar(100) 	not null,
	`user_gender` char(1)		check(user_gender in ('M', 'F')),
  `user_age`	int,
  `join_date`	date,
  primary key(`user_no`)
);