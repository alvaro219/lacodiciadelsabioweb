import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, Session } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;
  private publicClient: SupabaseClient;
  private writeClient: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        flowType: 'implicit'
      }
    });

    // Read-only client — no Navigator Lock, no session storage
    this.publicClient = createClient(environment.supabaseUrl, environment.supabaseKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    });

    // Write client — no Navigator Lock, but can receive a session for authenticated writes
    this.writeClient = createClient(environment.supabaseUrl, environment.supabaseKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    });
  }

  get client(): SupabaseClient {
    return this.supabase;
  }

  /** Client for public (anon) reads — never blocks on auth lock */
  get anonClient(): SupabaseClient {
    return this.publicClient;
  }

  /** Set session on the write client so authenticated mutations work without the Navigator Lock */
  async setWriteSession(session: Session | null): Promise<void> {
    if (session) {
      await this.writeClient.auth.setSession({
        access_token: session.access_token,
        refresh_token: session.refresh_token
      });
    } else {
      await this.writeClient.auth.signOut();
    }
  }

  /** Client for authenticated writes — no Navigator Lock */
  get authClient(): SupabaseClient {
    return this.writeClient;
  }
}
