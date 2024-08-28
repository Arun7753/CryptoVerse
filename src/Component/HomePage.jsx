import { useEffect, useState } from 'react';

const HomePage = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ws = new WebSocket('wss://stream.binance.com:9443/ws/!ticker@arr');

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      const top10 = data
        .sort((a, b) => parseFloat(b.q) - parseFloat(a.q))
        .slice(0, 10)
        .map((coin, index) => ({
          id: index + 1,
          name: coin.s,
          price: parseFloat(coin.c).toFixed(2),
          volume: parseFloat(coin.q).toFixed(2),
          change: parseFloat(coin.P).toFixed(2),
        }));

      setCryptoData(top10);
      setLoading(false);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      setLoading(false);
    };


    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="pt-20 md:flex md:justify-between md:bg-blue-900 rounded-sm">
      <section className="bg-blue-900 text-white text-center p-2 rounded-md md:ml-40 ">
        <div className='md:mt-52'>
          <p className='md:text-3xl md:font-bold'>Welcome to CryptoVerse,</p>
          <p className='md:font-bold'>Your Crypto Companion...!!</p>
        </div>
      </section>


      <section className="mt-2 border-2 md:bg-white md:rounded-lg md:mr-3">
        <p className="mt-2">Top 10 Trending Cryptos by Volume</p>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className=" text-center">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Coin</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Volume</th>
                <th className="px-4 py-2">Change (%)</th>
              </tr>
            </thead>
            <tbody>
              {cryptoData.map((coin) => (
                <tr key={coin.id} className="border-b">
                  <td className="">{coin.id}</td>
                  <td className="">{coin.name}</td>
                  <td className="px-2 py-2">${coin.price}</td>
                  <td className="">{coin.volume}</td>
                  <td className={` ${coin.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>{coin.change}</td>
                </tr>
              ))}
            </tbody>

          </table>
        )}
      </section>
    </div>
  );
};

export default HomePage;
