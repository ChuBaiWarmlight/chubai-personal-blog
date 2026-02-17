# Supabase项目创建和数据库配置指南

## 📋 快速开始

### 方式A：使用Supabase仪表板（推荐，最简单）

**步骤1：创建Supabase项目**

1. 访问：https://supabase.com/dashboard
2. 登录/注册账号
3. 点击 "New Project"
4. 填写项目信息：
   - **Name**: `blog-admin-system`
   - **Database Password**: 生成强密码（至少16位）
   - **Region**: 选择离您最近的区域（如：Southeast Asia）
   - **Pricing Plan**: Free（免费）
5. 点击 "Create new project"
6. 等待项目创建完成（约1-2分钟）

**步骤2：获取数据库连接信息**

1. 项目创建完成后，进入项目的 "Settings" → "Database"
2. 复制以下信息：
   - **Connection String**: `postgresql://postgres.user:password@aws-0-us-east-1.pooler.supabase.com:654321/project-ref`
   - **Project URL**: `https://your-project-ref.supabase.co`
   - **Project Reference**: `your-project-ref`
   - **Database Password**: （刚才创建的密码）

**步骤3：获取API密钥**

1. 进入项目的 "Settings" → "API"
2. 复制以下密钥：
   - **Project URL**: `https://your-project-ref.supabase.co`
   - **anon public**: `eyJhbGc...`（以 eyJhbGc 开头）
   - **service_role secret**: `eyJhbGc...`（以 eyJhbGc 开头）

**重要**：
- ✅ 只复制 `anon public` 到客户端环境变量
- ✅ 只在服务端使用 `service_role secret`
- ❌ 永远不要公开这两个密钥

---

### 方式B：使用Supabase CLI（快速）

**前提**：需要安装Supabase CLI

```bash
# 安装Supabase CLI
npm install -g supabase

# 登录
supabase login

# 列出项目
supabase projects list

# 链接到现有项目
supabase projects link --project-ref YOUR_PROJECT_REF
```

---

## 📋 配置环境变量

在项目根目录创建 `.env.local` 文件：

```bash
cd /root/.openclaw/workspace/chubai-personal-blog-repo/admin
cat > .env.local << 'EOF'
# Database
DATABASE_URL="postgresql://postgres.user:password@aws-0-us-east-1.pooler.supabase.com:654321/project-ref"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://your-project-ref.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGc..."

# Application
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_NAME="Blog Admin System"

# Security
NEXTAUTH_SECRET="your-jwt-secret-here"
NEXTAUTH_URL="http://localhost:3000/api/auth"
EOF
```

**重要**：
- ⚠️ `.env.local` 已添加到 `.gitignore`，不会被提交到Git
- ⚠️ 永远不要提交包含真实数据库连接信息的 `.env` 文件

---

## 🚀 推送数据库Schema到Supabase

### 方式A：使用Supabase仪表板（推荐）

1. 进入项目的 "Database" 页面
2. 点击 "Table Editor"
3. 点击 "Reset database"（如果有旧表）
4. 点击 "New table"
5. 选择 "Paste schema as SQL"
6. 复制 `src/prisma/schema.prisma` 的内容
7. 粘贴到编辑器
8. 点击 "Run SQL"

### 方式B：使用Prisma CLI（快速）

```bash
cd /root/.openclaw/workspace/chubai-personal-blog-repo/admin

# 生成Prisma Client
npx prisma generate

# 推送Schema到数据库
npx prisma db push

# 打开Prisma Studio（可视化数据库）
npx prisma studio
```

---

## ✅ 验证配置

**检查数据库连接**：
```bash
# 测试数据库连接
npx prisma db pull

# 查看数据库中的表
npx prisma db execute "SELECT * FROM User LIMIT 1"
```

**检查Supabase连接**：
```bash
# 测试Supabase连接
node -e "console.log(require('./src/lib/supabase/client.ts').supabase.auth.getSession())"
```

---

## 🔧 创建初始数据（可选）

### 创建管理员用户

在Supabase仪表板的 "Table Editor" 中执行：

```sql
-- 创建管理员用户
INSERT INTO "User" (
  id,
  email,
  username,
  password,
  role,
  status,
  created_at,
  updated_at
) VALUES (
  gen_random_uuid(),
  'admin@blog.com',
  'admin',
  '$2b$12$EixZaYVK1fhv...hashed_password...',
  'ADMIN',
  'ACTIVE',
  now(),
  now()
);
```

**注意**：
- ⚠️ 密码应该使用 bcrypt 或 Argon2 等加密算法哈希
- ⚠️ 在实际应用中实现安全密码存储
- ⚠️ 不要在SQL中使用明文密码

---

### 创建默认分类

```sql
-- 创建默认分类
INSERT INTO "Category" (
  id,
  name,
  slug,
  description,
  color,
  order,
  created_at,
  updated_at
) VALUES 
  (gen_random_uuid(), '技术文章', 'tech', '技术类文章分享', '#2563eb', 1, now(), now()),
  (gen_random_uuid(), '生活随笔', 'life', '日常生活记录和感悟', '#10b981', 2, now(), now()),
  (gen_random_uuid(), '项目记录', 'project', '项目开发过程和经验总结', '#f59e0b', 3, now(), now());
```

---

## 🎯 下一步

配置完成后，您可以：

1. ✅ **开始开发基础页面**
   - 登录页面
   - 仪表盘页面
   - 文章列表页面

2. ✅ **实现认证功能**
   - 用户注册
   - 用户登录
   - 用户登出
   - 会话管理

3. ✅ **实现文章管理**
   - 文章列表
   - 文章创建
   - 文章编辑
   - 文章删除

4. ✅ **部署到Vercel**
   - 连接Vercel账号
   - 导入GitHub仓库
   - 配置环境变量
   - 自动部署

---

## 📞 需要帮助？

如果在配置过程中遇到问题：

1. **数据库连接失败**
   - 检查 `DATABASE_URL` 是否正确
   - 检查Supabase项目是否已启动
   - 检查网络连接

2. **Prisma推送失败**
   - 检查Prisma schema语法
   - 运行 `npx prisma validate`
   - 查看Supabase Dashboard中的错误日志

3. **Supabase API错误**
   - 检查API密钥是否正确
   - 检查项目URL是否正确
   - 检查权限设置

---

## 🔐 安全提醒

**重要**：
- ⚠️ 永远不要将 `service_role secret` 提交到Git
- ⚠️ 永远不要将数据库密码提交到Git
- ⚠️ 所有敏感信息都应该在 `.env.local` 或环境变量中
- ⚠️ 使用 `.gitignore` 保护敏感文件

---

**配置完成后，项目将完全就绪，可以开始开发具体功能了！** 🚀
