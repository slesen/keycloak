import { useState } from 'react';
import keycloak from './keycloak';
import './App.css';

type Page = 'dashboard' | 'profile' | 'admin';

function App() {
  const [page, setPage] = useState<Page>('dashboard');

  const username =
    keycloak.tokenParsed?.preferred_username ?? 'Okänd användare';

  const roles: string[] =
    keycloak.tokenParsed?.realm_access?.roles ?? [];

  const isAdmin = roles.includes('tjo-admin');
  const isUser = roles.includes('tjo-user');

  const logout = () => {
    keycloak.logout({ redirectUri: window.location.origin });
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">T</div>
          <div>
            <strong>TJO</strong>
            <span>PORTAL</span>
          </div>
        </div>

        <div className="menu-label">ARBETSYTA</div>
        <nav className="navigation">
          <button
            className={page === 'dashboard' ? 'nav-item active' : 'nav-item'}
            onClick={() => setPage('dashboard')}
          >
            <span>▦</span> Översikt
          </button>

          <button
            className={page === 'profile' ? 'nav-item active' : 'nav-item'}
            onClick={() => setPage('profile')}
          >
            <span>◉</span> Min profil
          </button>

          {isAdmin && (
            <>
              <div className="menu-label admin-label">ADMINISTRATION</div>
              <button
                className={page === 'admin' ? 'nav-item active' : 'nav-item'}
                onClick={() => setPage('admin')}
              >
                <span>⚙</span> Administration
              </button>
            </>
          )}
        </nav>

        <div className="sidebar-bottom">
          <div className="security-note">
            <span className="status-dot" />
            Säker inloggning
            <small>Keycloak · TJO Realm</small>
          </div>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <div className="breadcrumb">TJO Portal <span>/</span> {
            page === 'dashboard' ? 'Översikt' :
            page === 'profile' ? 'Min profil' : 'Administration'
          }</div>

          <div className="user-menu">
            <div className="avatar">{username.charAt(0).toUpperCase()}</div>
            <div className="user-details">
              <strong>{username}</strong>
              <span>{isAdmin ? 'Administratör' : 'Användare'}</span>
            </div>
            <button className="logout-button" onClick={logout}>
              Logga ut ↗
            </button>
          </div>
        </header>

        <div className="content">
          {page === 'dashboard' && (
            <>
              <section className="welcome">
                <div>
                  <span className="eyebrow">DIN ARBETSPLATS</span>
                  <h1>Välkommen, {username}!</h1>
                  <p>Här hittar du din översikt och dina funktioner i TJO.</p>
                </div>
                <div className="welcome-symbol">TJO</div>
              </section>

              <div className="section-heading">
                <div>
                  <h2>Översikt</h2>
                  <p>Din konto- och behörighetsinformation</p>
                </div>
              </div>

              <section className="stats-grid">
                <article className="stat-card">
                  <div className="stat-icon blue">◉</div>
                  <span className="stat-label">KONTOSTATUS</span>
                  <strong className="stat-value">Aktivt</strong>
                  <span className="stat-foot">Du är inloggad</span>
                </article>

                <article className="stat-card">
                  <div className="stat-icon purple">◇</div>
                  <span className="stat-label">ANVÄNDARROLL</span>
                  <strong className="stat-value">
                    {isAdmin ? 'Administratör' : isUser ? 'Användare' : 'Ingen roll'}
                  </strong>
                  <span className="stat-foot">Från Keycloak</span>
                </article>

                <article className="stat-card">
                  <div className="stat-icon green">✓</div>
                  <span className="stat-label">INLOGGNING</span>
                  <strong className="stat-value">Verifierad</strong>
                  <span className="stat-foot">Keycloak OIDC</span>
                </article>
              </section>

              <div className="section-heading">
                <div>
                  <h2>Mina funktioner</h2>
                  <p>Funktioner som är tillgängliga för din roll</p>
                </div>
              </div>

              <section className="feature-grid">
                {isUser && (
                  <article className="feature-card">
                    <div className="feature-icon">▤</div>
                    <h3>Användarportal</h3>
                    <p>Din personliga arbetsyta och användarinformation.</p>
                    <button onClick={() => setPage('profile')}>
                      Visa profil →
                    </button>
                  </article>
                )}

                {isAdmin && (
                  <article className="feature-card">
                    <div className="feature-icon">⚙</div>
                    <h3>Administration</h3>
                    <p>Administrativa funktioner för TJO-portalen.</p>
                    <button onClick={() => setPage('admin')}>
                      Öppna administration →
                    </button>
                  </article>
                )}
              </section>
            </>
          )}

          {page === 'profile' && (
            <>
              <div className="section-heading">
                <div>
                  <h1>Min profil</h1>
                  <p>Information om ditt TJO-konto</p>
                </div>
              </div>
              <section className="detail-card">
                <div className="large-avatar">{username.charAt(0).toUpperCase()}</div>
                <h2>{username}</h2>
                <p className="muted">Inloggad användare</p>
                <div className="detail-row"><span>Användarnamn</span><strong>{username}</strong></div>
                <div className="detail-row"><span>Realm</span><strong>tjo</strong></div>
                <div className="detail-row"><span>Klient</span><strong>tjo-app</strong></div>
                <div className="detail-row"><span>Roller</span><strong>{roles.filter(r => r.startsWith('tjo-')).join(', ') || 'Inga TJO-roller'}</strong></div>
              </section>
            </>
          )}

          {page === 'admin' && isAdmin && (
            <>
              <div className="section-heading">
                <div>
                  <h1>Administration</h1>
                  <p>Administrativa funktioner för TJO</p>
                </div>
              </div>
              <section className="feature-grid">
                <article className="feature-card">
                  <div className="feature-icon">♙</div>
                  <h3>Användare</h3>
                  <p>Här bygger vi senare funktioner för användarhantering.</p>
                  <span className="coming-soon">Kommer senare</span>
                </article>
                <article className="feature-card">
                  <div className="feature-icon">♧</div>
                  <h3>Grupper och roller</h3>
                  <p>Här bygger vi senare funktioner för behörighetsadministration.</p>
                  <span className="coming-soon">Kommer senare</span>
                </article>
              </section>
            </>
          )}

          <footer className="footer">
            <span>TJO Portal</span>
            <span>Utvecklingsmiljö · Minikube</span>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default App;
