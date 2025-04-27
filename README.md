# Anonymous-Board

- 댓글 기능이 있는 익명 게시판 및 키워드 알림 기능을 구현합니다.

### `API & 기능 구성`

```
GET /boards - 게시글 목록 API
POST /boards - 게시글 작성 API
PATCH /boards/:boardId - 게시글 수정 API
DELTE /boards/:boardId - 게시글 삭제 API
GET /comments - 댓글 목록 API
POST /comments - 댓글 작성 API
@NotifyKeywords() - 인터셉터 기반 게시글 및 댓글 작성 시 자동 실행
```

### `프로젝트 시작하기`

- 프로젝트 git clone

```
> git clone https://github.com/Hugekyung/anonymous-boards.git
> cd anonymous-boards
```

- MySQL DB 세팅을 위한 Docker Container 생성(+테이블 생성 포함)

```
> docker compose up -d
```

- 의존성 설치 & 서버 실행

```
> yarn && yarn start:dev
```

- Swagger 접근 주소

```
http://localhost:3030/anonymous_board_swagger#/
```

### `프로젝트 디렉터리`

```
src/
├─ common/
│   ├─ database/        # TypeOrmModule, init.sql(테이블 생성 DDL 스크립트)
│   ├─ decorators/      # @NotifyKeywords()
│   ├─ interceptors/    # NotifyKeywordsInterceptor
│   └─ dto/             # ApiResponseDto, PaginationDto
│
├─ modules/
│   ├─ board/
│   │   ├─ dtos/
│   │   ├─ interfaces/
│   │   ├─ board.entity.ts
│   │   ├─ board.factory.ts     # board 객체 생성용 Factory 클래스
│   │   ├─ board.updater.ts     # board 업데이트 객체 생성용 Factory 클래스
│   │   ├─ board.repository.ts
│   │   ├─ board.module.ts
│   │   ├─ board.service.ts
│   │   └─ board.controller.ts
│   ├─ comment/
│   └─ notification/
│
├─ app.module.ts
└─ main.ts
```
