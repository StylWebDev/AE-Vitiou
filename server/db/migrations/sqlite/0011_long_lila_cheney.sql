CREATE TABLE `blog` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`img` blob,
	`date` integer DEFAULT '"2026-07-28T21:34:23.211Z"' NOT NULL,
	`title` text DEFAULT '' NOT NULL,
	`description` text DEFAULT '' NOT NULL,
	`link` text DEFAULT '' NOT NULL
);
--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_players` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`number` integer,
	`name` text NOT NULL,
	`pos` text,
	`isCaptain` integer,
	`created_at` integer DEFAULT '"2026-07-28T21:34:23.209Z"' NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_players`("id", "number", "name", "pos", "isCaptain", "created_at") SELECT "id", "number", "name", "pos", "isCaptain", "created_at" FROM `players`;--> statement-breakpoint
DROP TABLE `players`;--> statement-breakpoint
ALTER TABLE `__new_players` RENAME TO `players`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `players_number_unique` ON `players` (`number`);--> statement-breakpoint
CREATE UNIQUE INDEX `players_name_unique` ON `players` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `players_isCaptain_unique` ON `players` (`isCaptain`);