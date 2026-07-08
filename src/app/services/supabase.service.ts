import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;
  private publicClient: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        flowType: 'implicit'
      }
    });

    // A separate client without session persistence for public queries
    // This bypasses the internal auth lock that can block .from() calls
    this.publicClient = createClient(environment.supabaseUrl, environment.supabaseKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    });
  }

  get client(): SupabaseClient {
    return this.supabase;
  }

  /** Client for public (anon) queries that never blocks on auth */
  get anonClient(): SupabaseClient {
    return this.publicClient;
  }
}
