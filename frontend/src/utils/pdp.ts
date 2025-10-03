export async function getPdpDealStatus(cid: string) {
    const res = await fetch(
      `https://api.lighthouse.storage/api/lighthouse/pdp_deal_status?cid=${cid}`,
      { headers: { Accept: 'application/json' } }
    )
    if (!res.ok) throw new Error('Failed to fetch PDP deal status')
    return res.json()
  }
  
  export async function requestPdpDeal(cid: string) {
    const res = await fetch(
      `https://api.lighthouse.storage/api/lighthouse/pdp_deal_request?cid=${cid}`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.LIGHT_HOUSE_API_KEY}`,
          'Accept': 'application/json',
        },
      }
    )
    if (!res.ok) throw new Error('Failed to request PDP deal')
    return res.json()
  }