ALTER TABLE `players` RENAME COLUMN "position" TO "position_name";--> statement-breakpoint
CREATE TABLE `goals` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`player_id` integer NOT NULL,
	`match_id` integer NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`match_id`) REFERENCES `players`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `matches` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`status` text NOT NULL,
	`competition` text NOT NULL,
	`home` text NOT NULL,
	`away` text NOT NULL,
	`hs` integer NOT NULL,
	`points` integer NOT NULL,
	`as` integer NOT NULL,
	`date` integer,
	`trophy` integer NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE `players` ADD `created_at` integer NOT NULL;--> statement-breakpoint
ALTER TABLE `players` DROP COLUMN `ga`;