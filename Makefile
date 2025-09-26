# AI Builder Project Makefile
# Next.js + Docker 개발 환경을 위한 유틸리티 명령어들

.PHONY: help dev build start test lint format type-check clean install docker-build docker-up docker-down docker-logs docker-shell docker-prod prod-up prod-down logs shell

# 기본값 설정
DOCKER_COMPOSE_DEV = docker-compose -f docker-compose.dev.yml
DOCKER_COMPOSE_PROD = docker-compose -f docker-compose.prod.yml
CONTAINER_NAME = ai-builder-frontend-1

# 도움말 표시 (기본 타겟)
help: ## 사용 가능한 명령어들을 표시합니다
	@echo "🚀 AI Builder Project - 개발 도구"
	@echo ""
	@echo "📋 사용 가능한 명령어:"
	@echo ""
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)
	@echo ""
	@echo "💡 예시:"
	@echo "  make dev          # 개발 서버 시작"
	@echo "  make docker-up    # Docker로 개발 환경 시작"
	@echo "  make build        # 프로덕션 빌드"
	@echo ""

# 개발 관련 명령어
dev: ## 로컬에서 개발 서버를 시작합니다
	@echo "🚀 개발 서버를 시작합니다..."
	npm run dev

build: ## 프로덕션 빌드를 실행합니다
	@echo "🔨 프로덕션 빌드를 시작합니다..."
	npm run build

start: ## 프로덕션 서버를 시작합니다
	@echo "🎯 프로덕션 서버를 시작합니다..."
	npm start

test: ## 테스트를 실행합니다 (추후 구현)
	@echo "🧪 테스트를 실행합니다..."
	@echo "⚠️  테스트는 아직 구현되지 않았습니다."

lint: ## ESLint로 코드를 검사합니다
	@echo "🔍 ESLint로 코드를 검사합니다..."
	npm run lint

format: ## Prettier로 코드를 포맷팅합니다
	@echo "✨ 코드를 포맷팅합니다..."
	npx prettier --write "**/*.{js,jsx,ts,tsx,json,css,md}"

type-check: ## TypeScript 타입 체크를 실행합니다
	@echo "📝 TypeScript 타입 체크를 실행합니다..."
	npm run type-check

install: ## 의존성을 설치합니다
	@echo "📦 의존성을 설치합니다..."
	npm install

clean: ## node_modules와 빌드 파일들을 정리합니다
	@echo "🧹 빌드 파일들을 정리합니다..."
	rm -rf .next
	rm -rf node_modules
	rm -rf out
	@echo "✅ 정리 완료!"

# Docker 개발 환경 명령어
docker-build: ## Docker 개발 이미지를 빌드합니다
	@echo "🐳 Docker 개발 이미지를 빌드합니다..."
	$(DOCKER_COMPOSE_DEV) build

docker-up: ## Docker로 개발 환경을 시작합니다
	@echo "🐳 Docker 개발 환경을 시작합니다..."
	$(DOCKER_COMPOSE_DEV) up -d
	@echo "✅ 개발 서버가 http://localhost:3000 에서 실행 중입니다!"
	@echo "✅ Redis가 http://localhost:6379 에서 실행 중입니다!"

docker-down: ## Docker 개발 환경을 중지합니다
	@echo "🛑 Docker 개발 환경을 중지합니다..."
	$(DOCKER_COMPOSE_DEV) down

docker-logs: ## Docker 컨테이너 로그를 확인합니다
	@echo "📋 Docker 컨테이너 로그를 확인합니다..."
	$(DOCKER_COMPOSE_DEV) logs -f

docker-shell: ## Docker 컨테이너에 접속합니다
	@echo "🐚 Docker 컨테이너에 접속합니다..."
	docker exec -it $(CONTAINER_NAME) sh

docker-restart: ## Docker 컨테이너를 재시작합니다
	@echo "🔄 Docker 컨테이너를 재시작합니다..."
	$(DOCKER_COMPOSE_DEV) restart

# 프로덕션 Docker 명령어
docker-prod-build: ## 프로덕션 Docker 이미지를 빌드합니다
	@echo "🏗️  프로덕션 Docker 이미지를 빌드합니다..."
	$(DOCKER_COMPOSE_PROD) build

prod-up: ## 프로덕션 환경을 시작합니다
	@echo "🚀 프로덕션 환경을 시작합니다..."
	$(DOCKER_COMPOSE_PROD) up -d
	@echo "✅ 프로덕션 서버가 http://localhost:3000 에서 실행 중입니다!"

prod-down: ## 프로덕션 환경을 중지합니다
	@echo "🛑 프로덕션 환경을 중지합니다..."
	$(DOCKER_COMPOSE_PROD) down

prod-logs: ## 프로덕션 컨테이너 로그를 확인합니다
	@echo "📋 프로덕션 컨테이너 로그를 확인합니다..."
	$(DOCKER_COMPOSE_PROD) logs -f

# Redis 관련 명령어
redis-cli: ## Redis CLI에 접속합니다
	@echo "🔴 Redis CLI에 접속합니다..."
	docker exec -it ai-builder-redis-1 redis-cli

redis-logs: ## Redis 로그를 확인합니다
	@echo "📋 Redis 로그를 확인합니다..."
	docker logs ai-builder-redis-1

redis-info: ## Redis 서버 정보를 확인합니다
	@echo "ℹ️  Redis 서버 정보를 확인합니다..."
	docker exec ai-builder-redis-1 redis-cli info

redis-flush: ## Redis 데이터를 모두 삭제합니다
	@echo "🗑️  Redis 데이터를 삭제합니다..."
	docker exec ai-builder-redis-1 redis-cli flushall

redis-monitor: ## Redis 실시간 모니터링
	@echo "👀 Redis 실시간 모니터링을 시작합니다..."
	docker exec ai-builder-redis-1 redis-cli monitor

# 편의 명령어들
logs: docker-logs ## Docker 로그 확인 (docker-logs의 별칭)

shell: docker-shell ## Docker 셸 접속 (docker-shell의 별칭)

restart: docker-restart ## Docker 재시작 (docker-restart의 별칭)

# 개발 워크플로우 명령어들
dev-setup: install ## 개발 환경을 처음 설정합니다
	@echo "🛠️  개발 환경 설정을 시작합니다..."
	@if [ ! -f .env.local ]; then \
		echo "⚠️  .env.local 파일이 없습니다. 환경 변수를 설정해주세요."; \
		echo "   예시: cp .env.example .env.local"; \
	fi
	@echo "✅ 개발 환경 설정 완료!"
	@echo "💡 다음 명령어로 개발을 시작하세요: make docker-up"

check: lint type-check ## 코드 품질 검사를 실행합니다 (lint + type-check)
	@echo "✅ 모든 코드 품질 검사 완료!"

fix: format ## 코드 포맷팅을 실행합니다 (format의 별칭)

# Git 관련 명령어들 (선택사항)
git-status: ## Git 상태를 확인합니다
	@echo "📊 Git 상태를 확인합니다..."
	git status

git-push: ## 코드를 Git에 푸시합니다 (커밋 후)
	@echo "📤 코드를 Git에 푸시합니다..."
	git add .
	git commit -m "feat: $(filter-out $@,$(MAKECMDGOALS))" || true
	git push

# 환경 변수 확인
check-env: ## 환경 변수 파일 존재 여부를 확인합니다
	@echo "🔍 환경 변수 파일을 확인합니다..."
	@if [ -f .env.local ]; then \
		echo "✅ .env.local 파일이 존재합니다."; \
	else \
		echo "⚠️  .env.local 파일이 없습니다."; \
		echo "   개발을 위해 환경 변수 파일을 생성해주세요."; \
	fi
	@if [ -f .env.production ]; then \
		echo "✅ .env.production 파일이 존재합니다."; \
	else \
		echo "⚠️  .env.production 파일이 없습니다."; \
		echo "   프로덕션 배포를 위해 환경 변수 파일을 생성해주세요."; \
	fi

# 전체 정리
clean-all: clean ## 모든 생성된 파일들을 정리합니다
	@echo "🧹 모든 파일들을 정리합니다..."
	$(DOCKER_COMPOSE_DEV) down -v 2>/dev/null || true
	$(DOCKER_COMPOSE_PROD) down -v 2>/dev/null || true
	docker system prune -f
	@echo "✅ 전체 정리 완료!"

# 기본 타겟을 help로 설정
.DEFAULT_GOAL := help
