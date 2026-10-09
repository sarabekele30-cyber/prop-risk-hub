import { useState } from 'react';

interface PropFirm {
  id: string;
  name: string;
  maxLeverage: string;
  profitSplit: string;
  minChallengeFee: string;
  affiliateUrl: string;
  badge?: string;
}

const PROP_FIRMS: PropFirm[] = [
  {
    id: 'funding-pips',
    name: 'FundingPips',
    maxLeverage: '1:100',
    profitSplit: 'Up to 90%',
    minChallengeFee: '$32',
    affiliateUrl: 'YOUR_FUNDINGPIPS_AFFILIATE_LINK_HERE',
    badge: 'Most Popular'
  },
  {
    id: 'ftmo',
    name: 'FTMO',
    maxLeverage: '1:100',
    profitSplit: '80% - 90%',
    minChallengeFee: '€155',
    affiliateUrl: 'YOUR_FTMO_AFFILIATE_LINK_HERE'
  },
  {
    id: 'funded-next',
    name: 'FundedNext',
    maxLeverage: '1:100',
    profitSplit: 'Up to 95%',
    minChallengeFee: '$49',
    affiliateUrl: 'YOUR_FUNDEDNEXT_AFFILIATE_LINK_HERE',
    badge: 'High Profit Split'
  }
];

export default function App() {
  const [accountBalance, setAccountBalance] = useState<number>(50000);
  const [riskPercent, setRiskPercent] = useState<number>(2);
  const [stopLossPips, setStopLossPips] = useState<number>(25);

  const riskAmount = accountBalance * (riskPercent / 100);
  const lotSize = stopLossPips > 0 ? riskAmount / (stopLossPips * 10) : 0;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Prop Firm Risk & Position Calculator</h1>
      <p>Calculate your exact lot size and compare top funded account challenges.</p>

      {/* Calculator Inputs */}
      <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px' }}>
          <div>
            <label>Account Balance ($)</label>
            <input
              type="number"
              value={accountBalance}
              onChange={(e) => setAccountBalance(Number(e.target.value))}
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </div>
          <div>
            <label>Risk Percentage (%)</label>
            <input
              type="number"
              value={riskPercent}
              onChange={(e) => setRiskPercent(Number(e.target.value))}
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </div>
          <div>
            <label>Stop Loss (Pips)</label>
            <input
              type="number"
              value={stopLossPips}
              onChange={(e) => setStopLossPips(Number(e.target.value))}
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </div>
        </div>

        {/* Results */}
        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px', background: '#e0f2fe', padding: '15px', borderRadius: '6px' }}>
          <div>
            <small>Cash at Risk</small>
            <h2>${riskAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h2>
          </div>
          <div>
            <small>Recommended Lot Size</small>
            <h2>{lotSize.toFixed(2)} Lots</h2>
          </div>
        </div>
      </div>

      {/* Affiliate Table */}
      <h2>Recommended Prop Firms</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #ccc' }}>
            <th style={{ padding: '10px' }}>Firm</th>
            <th style={{ padding: '10px' }}>Profit Split</th>
            <th style={{ padding: '10px' }}>Min Fee</th>
            <th style={{ padding: '10px' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {PROP_FIRMS.map((firm) => (
            <tr key={firm.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '12px 10px', fontWeight: 'bold' }}>
                {firm.name} {firm.badge && <span style={{ fontSize: '10px', background: '#22c55e', color: '#fff', padding: '2px 6px', borderRadius: '4px', marginLeft: '5px' }}>{firm.badge}</span>}
              </td>
              <td style={{ padding: '12px 10px' }}>{firm.profitSplit}</td>
              <td style={{ padding: '12px 10px' }}>{firm.minChallengeFee}</td>
              <td style={{ padding: '12px 10px' }}>
                <a
                  href={firm.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ background: '#2563eb', color: '#fff', padding: '8px 12px', textDecoration: 'none', borderRadius: '4px', fontSize: '14px' }}
                >
                  Start Challenge
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}