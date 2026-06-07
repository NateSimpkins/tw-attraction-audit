exports.handler = async (event) => {
  const { orgId, apiKey } = event.queryStringParameters || {};
  if (!orgId || !apiKey) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing orgId or apiKey' }) };
  }
  try {
    const res = await fetch(`https://api.ticketweb.com/reporting/v1/attraction/orgs/${orgId}`, {
      headers: { 'x-auth-token': apiKey }
    });
    const data = await res.json();
    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify(data)
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
