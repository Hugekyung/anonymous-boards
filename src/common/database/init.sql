SET NAMES utf8mb4;
SET character_set_client      = 'utf8mb4';
SET character_set_connection  = 'utf8mb4';
SET character_set_results     = 'utf8mb4';
SET collation_connection      = 'utf8mb4_unicode_ci';

-- 키워드 알림 테이블ㅃ
CREATE TABLE `Keyword_Notifications` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `authorName` VARCHAR(15) NOT NULL COMMENT '작성자 이름',
  `keyword`    VARCHAR(15) NOT NULL COMMENT '키워드',
  `createdAt`  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성일시'
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci
  COMMENT='키워드 알림 테이블';


-- 게시판 테이블
CREATE TABLE `Boards` (
  `id`         INT AUTO_INCREMENT PRIMARY KEY,
  `title`      VARCHAR(100)  NOT NULL COMMENT '제목',
  `content`    VARCHAR(1000) NOT NULL COMMENT '내용',
  `authorName` VARCHAR(15)   NOT NULL COMMENT '작성자 이름',
  `password`   VARCHAR(100)  NOT NULL COMMENT '비밀번호',
  `createdAt`  TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성일시',
  `updatedAt`  TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP 
                                ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일시',
  `deletedAt`  TIMESTAMP     NULL DEFAULT NULL COMMENT '삭제일시'
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci
  COMMENT='게시판 테이블';


-- 댓글 테이블
CREATE TABLE `Comments` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `content` VARCHAR(1000) NOT NULL COMMENT '내용',
  `authorName` VARCHAR(15) NOT NULL COMMENT '작성자 이름',
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성일시',
  `parentId` INT NULL COMMENT '댓글 부모 ID',
  `boardId`  INT NULL COMMENT '게시물 ID',
  INDEX `idx_comments_parentId` (`parentId`),
  INDEX `idx_comments_boardId`  (`boardId`),
  CONSTRAINT `fk_comments_parentId`
    FOREIGN KEY (`parentId`)
    REFERENCES `Comments`(`id`)
    ON DELETE CASCADE,
  CONSTRAINT `fk_comments_boardId`
    FOREIGN KEY (`boardId`)
    REFERENCES `Boards`(`id`)
    ON DELETE CASCADE
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci
  COMMENT='댓글 테이블';