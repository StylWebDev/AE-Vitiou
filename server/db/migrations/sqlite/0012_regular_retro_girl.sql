PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_goals` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`player_id` integer NOT NULL,
	`match_id` integer NOT NULL,
	`ga` integer NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`match_id`) REFERENCES `matches`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_goals`("id", "player_id", "match_id", "ga", "created_at") SELECT "id", "player_id", "match_id", "ga", "created_at" FROM `goals`;--> statement-breakpoint
DROP TABLE `goals`;--> statement-breakpoint
ALTER TABLE `__new_goals` RENAME TO `goals`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `goals_match_id_player_id_unique` ON `goals` (`match_id`,`player_id`);--> statement-breakpoint
CREATE TABLE `__new_blog` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`img` blob,
	`date` integer DEFAULT '"2026-07-30T07:05:44.657Z"' NOT NULL,
	`title` text DEFAULT '' NOT NULL,
	`description` text DEFAULT '' NOT NULL,
	`link` text DEFAULT '' NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_blog`("id", "img", "date", "title", "description", "link") SELECT "id", "img", "date", "title", "description", "link" FROM `blog`;--> statement-breakpoint
DROP TABLE `blog`;--> statement-breakpoint
ALTER TABLE `__new_blog` RENAME TO `blog`;--> statement-breakpoint
CREATE TABLE `__new_players` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`number` integer,
	`name` text NOT NULL,
	`pos` text,
	`isCaptain` integer,
	`created_at` integer DEFAULT '"2026-07-30T07:05:44.655Z"' NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_players`("id", "number", "name", "pos", "isCaptain", "created_at") SELECT "id", "number", "name", "pos", "isCaptain", "created_at" FROM `players`;--> statement-breakpoint
DROP TABLE `players`;--> statement-breakpoint
ALTER TABLE `__new_players` RENAME TO `players`;--> statement-breakpoint
CREATE UNIQUE INDEX `players_number_unique` ON `players` (`number`);--> statement-breakpoint
CREATE UNIQUE INDEX `players_name_unique` ON `players` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `players_isCaptain_unique` ON `players` (`isCaptain`);