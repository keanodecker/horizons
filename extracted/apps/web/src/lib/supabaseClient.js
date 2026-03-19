import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rrblntehwdzyuqlpcshi.supabase.co';
const supabaseAnonKey = 'sb_publishable_xiqviQAtkIi8vnbb0i-vKw_pMIkRH87';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);