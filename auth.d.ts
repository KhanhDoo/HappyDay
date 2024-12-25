// auth.d.ts
declare module '#auth-utils' {
    interface User {
      // Add your own fields
      id: string
      email: string
      role: 'USER' | 'ADMIN'
      name: string
      avatarUrl: string | null
    }
  
    interface UserSession {
      // Add your own fields
    }
  
    interface SecureSessionData {
      // Add your own fields
    }
  }
  
  export {}