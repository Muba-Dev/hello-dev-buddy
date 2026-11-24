export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      admission_applications: {
        Row: {
          id: string
          created_at: string
          reference_id: string
          full_name: string
          age: number
          guardian_name: string | null
          phone: string
          email: string | null
          gender: string
          program_slug: string
          home_address: string
          previous_education: string | null
          emergency_contact: string
          agreed_to_terms: boolean
          status: "NEW" | "CONTACTED" | "PLACEMENT_DONE" | "ENROLLED" | "ARCHIVED"
          assigned_level: string | null
          teacher_notes: string | null
          payment_status: "UNPAID" | "PAID"
          payment_method: "CASH_AT_OFFICE" | "BANK_TRANSFER" | null
          receipt_note: string | null
          payment_verified_at: string | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          reference_id?: string
          full_name: string
          age: number
          guardian_name?: string | null
          phone: string
          email?: string | null
          gender: string
          program_slug: string
          home_address: string
          previous_education?: string | null
          emergency_contact: string
          agreed_to_terms?: boolean
          status?: "NEW" | "CONTACTED" | "PLACEMENT_DONE" | "ENROLLED" | "ARCHIVED"
          assigned_level?: string | null
          teacher_notes?: string | null
          payment_status?: "UNPAID" | "PAID"
          payment_method?: "CASH_AT_OFFICE" | "BANK_TRANSFER" | null
          receipt_note?: string | null
          payment_verified_at?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          reference_id?: string
          full_name?: string
          age?: number
          guardian_name?: string | null
          phone?: string
          email?: string | null
          gender?: string
          program_slug?: string
          home_address?: string
          previous_education?: string | null
          emergency_contact?: string
          agreed_to_terms?: boolean
          status?: "NEW" | "CONTACTED" | "PLACEMENT_DONE" | "ENROLLED" | "ARCHIVED"
          assigned_level?: string | null
          teacher_notes?: string | null
          payment_status?: "UNPAID" | "PAID"
          payment_method?: "CASH_AT_OFFICE" | "BANK_TRANSFER" | null
          receipt_note?: string | null
          payment_verified_at?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      admin_users: {
        Row: {
          user_id: string
          created_at: string
        }
        Insert: {
          user_id: string
          created_at?: string
        }
        Update: {
          user_id?: string
          created_at?: string
        }
        Relationships: []
      }
      admission_audit_log: {
        Row: {
          id: number
          application_id: string
          changed_by: string | null
          action: string
          from_status: "NEW" | "CONTACTED" | "PLACEMENT_DONE" | "ENROLLED" | "ARCHIVED" | null
          to_status: "NEW" | "CONTACTED" | "PLACEMENT_DONE" | "ENROLLED" | "ARCHIVED" | null
          details: Json
          created_at: string
        }
        Insert: {
          id?: number
          application_id: string
          changed_by?: string | null
          action: string
          from_status?: "NEW" | "CONTACTED" | "PLACEMENT_DONE" | "ENROLLED" | "ARCHIVED" | null
          to_status?: "NEW" | "CONTACTED" | "PLACEMENT_DONE" | "ENROLLED" | "ARCHIVED" | null
          details?: Json
          created_at?: string
        }
        Update: {
          id?: number
          application_id?: string
          changed_by?: string | null
          action?: string
          from_status?: "NEW" | "CONTACTED" | "PLACEMENT_DONE" | "ENROLLED" | "ARCHIVED" | null
          to_status?: "NEW" | "CONTACTED" | "PLACEMENT_DONE" | "ENROLLED" | "ARCHIVED" | null
          details?: Json
          created_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      admission_status: "NEW" | "CONTACTED" | "PLACEMENT_DONE" | "ENROLLED" | "ARCHIVED"
      payment_status: "UNPAID" | "PAID"
      payment_method: "CASH_AT_OFFICE" | "BANK_TRANSFER"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
