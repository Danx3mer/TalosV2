import { createClient } from 'jsr:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

async function getUserID(sClient, username) {
  let { data, error } = await sClient.auth.admin.listUsers()

  let res = "none"

  for (let user of data["users"]) {
      if(user["email"] === `${username}@talosv2.com`) res = user["id"]
    }

    if(error) throw error

    return res
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      }
    )

    const { username } = await req.json()

    if (!username) {
      return new Response(
        JSON.stringify({ error: 'Username is required.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const uid = await getUserID(supabaseClient, username.toLowerCase())

    if(uid === "none") {
      return new Response(
        JSON.stringify({ error: 'Username is invalid.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const { data, error } = await supabaseClient.auth.admin.deleteUser(uid)

    if(error) throw error
	
	    return new Response(
		JSON.stringify({ data: data }),
		{ status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
	)

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})


