# 数据库配置指南

## 📋 快速配置步骤

### 步骤1：创建Supabase项目（必需）

1. 访问：https://supabase.com/dashboard
2. 登录/注册账号
3. 点击"New Project"
4. 项目名称：`blog-admin-system`
5. 组织：可选
6. 区域：Southeast Asia（推荐）
7. PostgreSQL版本：15.x（推荐）
8. 点击"Create Project"
9. 等待项目创建完成（约30秒）

---

### 步骤2：获取数据库信息

从Supabase仪表板的**Project Settings**页面获取以下信息：

**必需信息**：
1. **Project URL**
   - 格式：`postgresql://postgres.user:password@aws-0-us-east-1.pooler.supabase.com:5432/project-ref`
   - 位置：Settings → Database → Connection string
   - 操作：复制此URL

2. **Project API Key (Anon/Public)**
   - 格式：`eyJhbGc...`
   - 位置：Settings → API → Project API keys
   - 操作：创建新密钥，选择`anon/public`角色
   - 重要：只显示一次，立即复制

3. **Database Password**
   - 格式：随机生成的密码
   - 位置：Settings → Database → Database password
   - 操作：复制此密码

---

### 步骤3：配置环境变量

在项目根目录创建 `.env.local` 文件：

```bash
cd /root/.openclaw/workspace/chubai-personal-blog-repo/admin

cat > .env.local << 'EOF'
# Database
DATABASE_URL="postgresql://postgres.user:password@aws-0-us-east-1.pooler.supabase.com:5432/project-ref"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://project-ref.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGc..."
NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY="eyJhbGc..."

# Application
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_NAME="Blog Admin System"

# Security
NEXTAUTH_SECRET="your-jwt-secret-here"
NEXTAUTH_URL="http://localhost:3000/api/auth"
EOF
```

**重要提示**：
- ⚠️ **不要提交** `.env.local` 到Git
- ✅ 添加 `.env.local` 到 `.gitignore`
- ✅ 所有环境变量都有值

---

### 步骤4：初始化Prisma数据库

```bash
cd /root/.openclaw/workspace/chubai-personal-blog-repo/admin

# 更新schema.prisma中的数据库URL
# 将 DATABASE_URL 粘贴到 schema.prisma

# 生成Prisma客户端
npx prisma generate

# 推送数据库schema
npx prisma db push

# 或者创建新迁移
npx prisma migrate dev --name init_schema
```

---

### 步骤5：验证配置

```bash
# 测试数据库连接
npx prisma db pull

# 查看数据库表
npx prisma studio

# 测试Supabase连接
node -e "console.log(require('@supabase/supabase-js').createClient())"
```

---

## 🔐 安全建议

1. **不要公开密钥**：永远不要提交API密钥到公开仓库
2. **使用环境变量**：所有敏感信息都应该在 `.env.local` 中
3. **访问控制**：限制API密钥的权限
4. **定期轮换**：定期更换API密钥
5. **监控访问**：在Supabase仪表板监控API使用情况

---

## 🚀 快速开始

**最简单的方式**：
1. 创建Supabase项目
2. 复制三个必需信息（URL、Anon Key、Database Password）
3. 发送给我，我会配置到 `.env.local`
4. 运行 `npx prisma db push` 同步数据库

**预计时间**：5-10分钟

---

## 📞 需要帮助？

如果遇到问题，请提供以下信息：
1. Supabase项目名称
2. 错误信息
3. 数据库连接状态
4. Prisma错误日志

**配置完成**后，我将：
1. ✅ 创建数据库表
2. ✅ 生成初始数据
3. ✅ 实现基础页面（登录、仪表盘）
4. ✅ 实现认证功能
5. ✅ 推送到GitHub
