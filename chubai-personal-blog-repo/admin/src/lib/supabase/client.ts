// Supabase客户端配置
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 数据库类型
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          username: string
          password: string
          avatar: string | null
          bio: string | null
          role: 'USER' | 'ADMIN' | 'SUPER_ADMIN'
          status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'BANNED'
          created_at: string
          updated_at: string
          last_login_at: string | null
          is_email_verified: boolean
          posts: unknown[]
          comments: unknown[]
          media: unknown[]
        }
      }
      posts: {
        Row: {
          id: string
          title: string
          slug: string
          excerpt: string | null
          content: string
          content_html: string
          cover_image: string | null
          status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
          published_at: string | null
          created_at: string
          updated_at: string
          published_by: string | null
          author_id: string
          category_id: string | null
          tags: unknown[]
          comments: unknown[]
          media: unknown[]
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          icon: string | null
          color: string | null
          order: number
          created_at: string
          updated_at: string
        }
      }
      tags: {
        Row: {
          id: string
          name: string
          slug: string
          created_at: string
          updated_at: string
        }
      }
      comments: {
        Row: {
          id: string
          content: string
          status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'SPAM'
          created_at: string
          updated_at: string
          author_id: string
          post_id: string | null
          parent_id: string | null
          post_id: string
        }
      }
      media: {
        Row: {
          id: string
          name: string
          url: string
          type: 'IMAGE' | 'VIDEO' | 'AUDIO' | 'DOCUMENT' | 'OTHER'
          size: number
          mime_type: string | null
          width: number | null
          height: number | null
          alt: string | null
          created_at: string
          updated_at: string
          author_id: string
          post_id: string | null
          media_id: string
        }
      }
      settings: {
        Row: {
          id: string
          site_name: string
          site_title: string
          site_description: string | null
          site_url: string
          logo_url: string | null
          favicon: string | null
          created_at: string
          updated_at: string
        }
      }
      file_uploads: {
        Row: {
          id: string
          original_name: string
          stored_name: string
          url: string
          type: string
          size: number
          status: 'PENDING' | 'COMPLETED' | 'FAILED'
          created_at: string
        }
      }
    }
  }
}

// 辅助函数
export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message
  }
  return String(error)
}

export const handleSupabaseError = (error: unknown) => {
  console.error('Supabase error:', error)
  throw new Error(getErrorMessage(error))
}

// 认证相关函数
export const auth = {
  signUp: async (email: string, password: string, username: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
          avatar_url: null,
        },
      },
    })

    if (error) throw handleSupabaseError(error)
    return data
  },

  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw handleSupabaseError(error)
    return data
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw handleSupabaseError(error)
  },

  getSession: async () => {
    const { data: { session }, error } = await supabase.auth.getSession()
    if (error) throw handleSupabaseError(error)
    return session
  },
}

// 数据库操作函数
export const db = {
  users: {
    getProfile: async (userId: string) => {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) throw handleSupabaseError(error)
      return data
    },

    updateProfile: async (userId: string, updates: Partial<Database['public']['Tables']['users']['Row']>) => {
      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', userId)

      if (error) throw handleSupabaseError(error)
      return data
    },
  },

  posts: {
    getAll: async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw handleSupabaseError(error)
      return data
    },

    getById: async (postId: string) => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', postId)
        .single()

      if (error) throw handleSupabaseError(error)
      return data
    },

    create: async (post: Omit<Database['public']['Tables']['posts']['Row'], 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('posts')
        .insert({
          ...post,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })

      if (error) throw handleSupabaseError(error)
      return data
    },

    update: async (postId: string, updates: Partial<Database['public']['Tables']['posts']['Row']>) => {
      const { data, error } = await supabase
        .from('posts')
        .update(updates)
        .eq('id', postId)

      if (error) throw handleSupabaseError(error)
      return data
    },

    delete: async (postId: string) => {
      const { data, error } = await supabase
        .from('posts')
        .delete()
        .eq('id', postId)

      if (error) throw handleSupabaseError(error)
      return data
    },
  },

  categories: {
    getAll: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('order', { ascending: true })

      if (error) throw handleSupabaseError(error)
      return data
    },

    create: async (category: Omit<Database['public']['Tables']['categories']['Row'], 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('categories')
        .insert({
          ...category,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })

      if (error) throw handleSupabaseError(error)
      return data
    },
  },

  tags: {
    getAll: async () => {
      const { data, error } = await supabase
        .from('tags')
        .select('*')
        .order('name', { ascending: true })

      if (error) throw handleSupabaseError(error)
      return data
    },

    create: async (tag: Omit<Database['public']]['Tables']['tags']['Row'], 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('tags')
        .insert({
          ...tag,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })

      if (error) throw handleSupabaseError(error)
      return data
    },
  },

  media: {
    getAll: async () => {
      const { data, error } = await supabase
        .from('media')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw handleSupabaseError(error)
      return data
    },

    upload: async (file: File, userId: string) => {
      // 实现文件上传到Supabase Storage
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`
      
      const { data, error } = await supabase.storage
        .from('media')
        .upload(fileName, file)

      if (error) throw handleSupabaseError(error)

      // 获取公开URL
      const { data: { publicUrl }, error: urlError } = await supabase.storage
        .from('media')
        .getPublicUrl(fileName)

      if (urlError) throw handleSupabaseError(urlError)

      // 保存到数据库
      const { data: uploadData, error: dbError } = await supabase
        .from('media')
        .insert({
          name: file.name,
          url: publicUrl,
          type: file.type as any,
          size: file.size,
          author_id: userId,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })

      if (dbError) throw handleSupabaseError(dbError)

      return uploadData
    },
  },

  comments: {
    getAll: async () => {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw handleSupabaseError(error)
      return data
    },

    create: async (comment: Omit<Database['public']['Tables']['comments']['Row'], 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('comments')
        .insert({
          ...comment,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })

      if (error) throw handleSupabaseError(error)
      return data
    },

    update: async (commentId: string, status: Database['public']['Tables']['comments']['Row']['status']) => {
      const { data, error } = await supabase
        .from('comments')
        .update({ status })
        .eq('id', commentId)

      if (error) throw handleSupabaseError(error)
      return data
    },
  },

  settings: {
    get: async () => {
      const { data, error } = await supabase
        .from('settings')
        .select('*')
        .single()

      if (error) throw handleSupabaseError(error)
      return data
    },

    update: async (settings: Omit<Database['public']['Tables']['settings']['Row'], 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('settings')
        .update(settings)
        .eq('id', settings.id)

      if (error) throw handleSupabaseError(error)
      return data
    },
  },
}

// 实时订阅
export const realtime = {
  posts: {
    subscribe: (callback: (payload: any) => void) => {
      return supabase
        .channel('public:posts')
        .on('INSERT', callback)
        .on('UPDATE', callback)
        .on('DELETE', callback)
    },
  },

  comments: {
    subscribe: (callback: (payload: any) => void) => {
      return supabase
        .channel('public:comments')
        .on('INSERT', callback)
        .on('UPDATE', callback)
        .on('DELETE', callback)
    },
  },
}
