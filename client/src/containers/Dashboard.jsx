import { useState, useEffect } from 'react';
import './Dashboard.css';
import { StatCard } from '../components/Cards';
import { CREATE_URL_API, GET_URLS_API, URL_STATS_API } from '../utilities/apis';
import Header from '../components/Header';

function Dashboard() {
    const [shortUrl, setShortUrl] = useState('');
    const [customAlias, setCustomAlias] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [urls, setUrls] = useState([]);
    const [stats, setStats] = useState({
        totalUrls: 0,
        totalClicks: 0,
        todayClicks: 0,
    });

    useEffect(() => {
        fetchUrls();
        fetchStats();
    }, []);

    const fetchUrls = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(GET_URLS_API, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await response.json();
            if (response.ok) {
                setUrls(data || []);
            }
        } catch (err) {
            console.error('Error fetching URLs:', err);
        }
    };

    const fetchStats = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(URL_STATS_API, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await response.json();
            if (response.ok) {
                setStats({
        totalUrls: data?.overallStats[0]?.totalUrls,
        totalClicks: data?.overallStats[0]?.totalClicks,
        todayClicks: data?.todayStats[0]?.totalClicks,
    });
            }
        } catch (err) {
            console.error('Error fetching stats:', err);
        }
    };

    const handleCreateUrl = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            if (!shortUrl) {
                setError('Please enter a URL');
                setLoading(false);
                return;
            }

            const token = localStorage.getItem('token');
            const response = await fetch(CREATE_URL_API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    originalUrl: shortUrl,
                    customAlias: customAlias || undefined,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || 'Failed to create short URL');
                setLoading(false);
                return;
            }

            setSuccess(`Short URL created: ${data.shortUrl}`);
            setShortUrl('');
            setCustomAlias('');
            setLoading(false);
            fetchUrls();
            fetchStats();
        } catch (err) {
            setError(err.message || 'An error occurred');
            setLoading(false);
        }
    };

    function copyText(text) {
        navigator.clipboard.writeText(text).then(() => {
            setSuccess("Copied the url: " + text);
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    }

    return (
        <div className="dashboard-container">
            <Header />

            <div className="dashboard-layout">
                {/* Left side - Analytics (2/3) */}
                <div className="analytics-section">
                    <div className="stats-grid">
                        <StatCard icon={"📊"} label={"Total URLs"} value={stats.totalUrls} />
                        <StatCard icon={"🔗"} label={"Total Clicks"} value={stats.totalClicks} />
                        <StatCard icon={"📈"} label={"Today's Clicks"} value={stats.todayClicks} />
                    </div>

                    <div className="urls-table-container">
                        <h2>Recent Short URLs</h2>
                        <div className="urls-table">
                            {urls.length > 0 ? (
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Short Code</th>
                                            <th>Original URL</th>
                                            <th>Clicks</th>
                                            <th>Created</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {urls.map((url) => (
                                            <tr key={url._id}>
                                                <td className="short-code">{url.shortCode}</td>
                                                <td className="original-url">
                                                    <a href={url.longUrl} target="_blank" rel="noopener noreferrer">
                                                        {url.longUrl.substring(0, 40)}...
                                                    </a>
                                                </td>
                                                <td>{url.clicks}</td>
                                                <td>{new Date(url.createdAt).toLocaleDateString()}</td>
                                                <td>
                                                    <button className="copy-btn" onClick={() => copyText(url.shortUrl)}>Copy</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p className="no-data">No URLs created yet</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right side - Create Form (1/3) */}
                <div className="create-form-section">
                    <div className="form-card">
                        <h2>Create New Short URL</h2>

                        {error && <div className="alert alert-error">{error}</div>}
                        {success && <div className="alert alert-success">{success}</div>}

                        <form onSubmit={handleCreateUrl} className="create-form">
                            <div className="form-group">
                                <label htmlFor="shortUrl">Original URL *</label>
                                <input
                                    id="shortUrl"
                                    type="url"
                                    placeholder="https://example.com/very/long/url"
                                    value={shortUrl}
                                    onChange={(e) => setShortUrl(e.target.value)}
                                    className="form-input"
                                    disabled={loading}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="customAlias">Custom Alias (Optional)</label>
                                <input
                                    id="customAlias"
                                    type="text"
                                    placeholder="my-custom-link"
                                    value={customAlias}
                                    onChange={(e) => setCustomAlias(e.target.value)}
                                    className="form-input"
                                    disabled={loading}
                                />
                            </div>

                            <button
                                type="submit"
                                className="submit-btn"
                                disabled={loading}
                            >
                                {loading ? 'Creating...' : 'Create Short URL'}
                            </button>
                        </form>

                        <div className="quick-stats">
                            <h3>Quick Info</h3>
                            <ul>
                                <li>✓ Fast URL shortening</li>
                                <li>✓ Custom aliases</li>
                                <li>✓ Click tracking</li>
                                <li>✓ Easy to share</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
