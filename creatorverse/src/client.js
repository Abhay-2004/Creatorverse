import { createClient } from '@supabase/supabase-js';

const URL = 'https://mlgvoswdmhballskeril.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1sZ3Zvc3dkbWhiYWxsc2tlcmlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ1MjE2MDMsImV4cCI6MjA0MDA5NzYwM30.62Fs8Gqo8MWPmvsODlBkW3DJtICOmwKwHVmSrMaFnwo';

export const supabase = createClient(URL, API_KEY);