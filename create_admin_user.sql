-- Criar usuário Admin no Supabase Auth via SQL
-- Email: admin@cataguases.mg.gov.br
-- Senha: s0pr4d0r.pr3f

DO $$
DECLARE
  new_user_id uuid := gen_random_uuid();
  admin_email text := 'admin@cataguases.mg.gov.br';
  admin_password text := 's0pr4d0r.pr3f';
  hashed_password text;
BEGIN
  -- Verificar se o usuário já existe
  IF EXISTS (SELECT 1 FROM auth.users WHERE email = admin_email) THEN
    RAISE NOTICE 'O usuário % já existe.', admin_email;
    RETURN;
  END IF;

  -- Hash da senha usando bcrypt (padrão do Supabase)
  -- Requer a extensão pgcrypto instalada (o Supabase já tem por padrão)
  hashed_password := crypt(admin_password, gen_salt('bf'));

  -- Inserir na tabela auth.users
  -- IMPORTANTE: confirmation_token, recovery_token e email_change_token_new
  -- devem ser '' (string vazia), NÃO null — o GoTrue rejeita null com
  -- "Database error querying schema" durante signInWithPassword.
  INSERT INTO auth.users (
    instance_id, id, aud, role, email, encrypted_password,
    email_confirmed_at, raw_app_meta_data, raw_user_meta_data,
    confirmation_token, recovery_token, email_change_token_new,
    email_change_token_current, email_change, phone,
    created_at, updated_at
  ) VALUES (
    '00000000-0000-0000-0000-000000000000',
    new_user_id,
    'authenticated',
    'authenticated',
    admin_email,
    hashed_password,
    now(),
    '{"provider":"email","providers":["email"]}',
    '{}',
    '', '', '', '', '', '',
    now(),
    now()
  );

  -- Inserir na tabela auth.identities (necessário para o login funcionar corretamente)
  INSERT INTO auth.identities (
    provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at
  ) VALUES (
    new_user_id::text, 
    new_user_id, 
    format('{"sub":"%s","email":"%s"}', new_user_id::text, admin_email)::jsonb, 
    'email', 
    now(), 
    now(), 
    now()
  );

  RAISE NOTICE 'Usuário admin criado com sucesso!';
END $$;
