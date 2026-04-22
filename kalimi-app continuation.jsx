import { useState, useEffect, useRef } from "react";
import {
  Home, Smartphone, HelpCircle, User, Search, ChevronRight, ChevronLeft,
  AlertTriangle, Mail, Globe, Clock, Wifi, CheckCircle2, Tag, Sparkles,
  QrCode, Signal, MessageCircle, FileText, Settings, LogOut, CreditCard,
  Bell, BellOff, MapPin, Plus, Minus, Download, Copy, RefreshCw,
  ShoppingCart, Plane, X, Check, Info, Zap, Trash2, Map, Monitor,
  Fingerprint, Moon, Shield, Radio, Languages,
} from "lucide-react";

/* ============================================================
   BRAND TOKENS — pulled from kalimi.com screenshots
============================================================ */
const B = {
  name: "kalimi",
  yellow: "#FFD60A", yellowSoft: "#FFF8E1", yellowDeep: "#F5C400",
  ink: "#0F0F0F", ink2: "#3A3A3A", sub: "#6B7280",
  line: "#EAEAEA", lineSoft: "#F2F2F2",
  bg: "#FFFFFF", canvas: "#FAFAFA",
  danger: "#B45309", dangerSoft: "#FEF3C7",
  success: "#166534", successSoft: "#DCFCE7",
  info: "#1E40AF", infoSoft: "#DBEAFE",
};

const FONT_STACK = '"Poppins", ui-sans-serif, system-ui, sans-serif';

/* ============================================================
   DATA
============================================================ */
const REGIONS = [
  { key: "local", label: "Local" },
  { key: "regional", label: "Regional" },
  { key: "global", label: "Global" },
];

const heroImage = (name) =>
  `https://source.unsplash.com/600x400/?${encodeURIComponent(name)},travel,cityscape`;

const COUNTRIES = [
  { code: "TR", name: "Türkiye", flag: "🇹🇷", plans: 8, from: "$4.50" },
  { code: "US", name: "United States", flag: "🇺🇸", plans: 12, from: "$4.90" },
  { code: "JP", name: "Japan", flag: "🇯🇵", plans: 9, from: "$5.20" },
  { code: "TH", name: "Thailand", flag: "🇹🇭", plans: 7, from: "$4.20" },
  { code: "ES", name: "Spain", flag: "🇪🇸", plans: 10, from: "$3.90" },
  { code: "MX", name: "Mexico", flag: "🇲🇽", plans: 6, from: "$4.40" },
  { code: "AE", name: "United Arab Emirates", flag: "🇦🇪", plans: 8, from: "$6.10" },
  { code: "IT", name: "Italy", flag: "🇮🇹", plans: 10, from: "$3.90" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧", plans: 9, from: "$3.90" },
  { code: "GR", name: "Greece", flag: "🇬🇷", plans: 8, from: "$4.10" },
  { code: "LT", name: "Lithuania", flag: "🇱🇹", plans: 7, from: "$10.99" },
  { code: "BR", name: "Brazil", flag: "🇧🇷", plans: 9, from: "$5.50" },
  { code: "ID", name: "Indonesia", flag: "🇮🇩", plans: 8, from: "$4.80" },
  { code: "MY", name: "Malaysia", flag: "🇲🇾", plans: 7, from: "$4.30" },
  { code: "DE", name: "Germany", flag: "🇩🇪", plans: 9, from: "$3.90" },
  { code: "FR", name: "France", flag: "🇫🇷", plans: 10, from: "$3.90" },
];

const planGroups = {
  default: [
    { duration: "7 days", options: [
      { id: "p1", data: "1 GB", price: "$4.50" },
      { id: "p2", data: "3 GB", price: "$8.90" },
    ]},
    { duration: "30 days", options: [
      { id: "p3", data: "5 GB", price: "$12.50" },
      { id: "p4", data: "10 GB", price: "$19.90" },
      { id: "p5", data: "20 GB", price: "$29.90" },
    ]},
    { duration: "60 days", options: [
      { id: "p6", data: "50 GB", price: "$38.99" },
    ]},
  ],
};

const PLAN_DETAILS_DEFAULT = {
  network: { names: ["Orange Belgium", "Proximus"], more: 31, generation: "5G" },
  topup: "Available for this plan",
  hotspot: "Supported",
  activation: "Package activates upon first data usage.",
  delivery: "Receive QR code directly after purchase",
  sms: "Data only",
};

const COVERAGE_COUNTRIES = [
  { flag: "🇫🇷", name: "France",      carriers: [{ n: "Free Mobile", g: "5G" }, { n: "SFR", g: "5G" }] },
  { flag: "🇮🇪", name: "Ireland",     carriers: [{ n: "Vodafone", g: "LTE" }, { n: "3", g: "5G" }] },
  { flag: "🇫🇮", name: "Finland",     carriers: [{ n: "Telia", g: "5G" }] },
  { flag: "🇷🇴", name: "Romania",     carriers: [{ n: "Vodafone", g: "LTE" }, { n: "Orange Romania", g: "5G" }] },
  { flag: "🇻🇦", name: "Vatican City", carriers: [{ n: "ILIAD Italia", g: "5G" }, { n: "Vodafone Italy", g: "LTE" }] },
  { flag: "🇱🇺", name: "Luxembourg",  carriers: [{ n: "Orange", g: "5G" }, { n: "Tango", g: "5G" }] },
  { flag: "🇬🇷", name: "Greece",      carriers: [{ n: "Cosmote", g: "5G" }] },
  { flag: "🇳🇱", name: "Netherlands", carriers: [{ n: "KPN", g: "5G" }, { n: "Vodafone NL", g: "5G" }] },
  { flag: "🇱🇹", name: "Lithuania",   carriers: [{ n: "Telia LT", g: "5G" }] },
  { flag: "🇱🇻", name: "Latvia",      carriers: [{ n: "LMT", g: "5G" }] },
  { flag: "🇮🇹", name: "Italy",       carriers: [{ n: "TIM", g: "5G" }] },
  { flag: "🇪🇸", name: "Spain",       carriers: [{ n: "Movistar", g: "5G" }, { n: "Vodafone ES", g: "LTE" }] },
  { flag: "🇩🇪", name: "Germany",     carriers: [{ n: "Deutsche Telekom", g: "5G" }] },
];

const MY_ESIMS_INITIAL = [
  { id: "e1", country: "Türkiye", flag: "🇹🇷", data: "5 GB",  used: 1.2, total: 5,  days: 30, daysLeft: 22, status: "active",        iccid: "8990-1234-5678-9012-3456" },
  { id: "e2", country: "Japan",   flag: "🇯🇵", data: "3 GB",  used: 0,   total: 3,  days: 15, daysLeft: 15, status: "not_installed", iccid: "8990-5678-9012-3456-7890" },
  { id: "e3", country: "Spain",   flag: "🇪🇸", data: "10 GB", used: 9.2, total: 10, days: 30, daysLeft: 5,  status: "active_low",    iccid: "8990-9999-1111-2222-3333" },
];

const ORDERS = [
  { id: "K-10429", country: "Türkiye", flag: "🇹🇷", data: "5 GB",  date: "Apr 14, 2026", total: "$12.50" },
  { id: "K-10311", country: "Japan",   flag: "🇯🇵", data: "3 GB",  date: "Mar 28, 2026", total: "$8.90" },
  { id: "K-10197", country: "Spain",   flag: "🇪🇸", data: "10 GB", date: "Mar 02, 2026", total: "$19.90" },
];

const REGIONAL_PLANS = [
  { id: "eu",  name: "Europe eSIM", icon: Map,   from: "$12.99", covers: ["France", "Spain", "Italy", "Germany", "Netherlands", "Greece", "Lithuania", "Latvia"] },
  { id: "glb", name: "Global eSIM", icon: Globe, from: "$13.99", covers: ["France", "Spain", "USA", "Japan", "Türkiye", "Indonesia", "Malaysia", "Brazil"] },
];

const FAQS = [
  { q: "What is an eSIM?", a: "An eSIM is a digital SIM built into your phone. No physical card — you install it by scanning a QR code." },
  { q: "Will it work on my phone?", a: "Most phones from 2018 onwards support eSIM. Use the compatibility checker to verify your device in seconds." },
  { q: "When does my plan start?", a: "Your plan activates the moment you connect to a local network at your destination. Install ahead of time — activate on arrival." },
  { q: "Can I keep my regular number?", a: "Yes. Your home SIM stays active for calls and texts. The Kalimi eSIM handles data." },
  { q: "What if I run out of data?", a: "Top up directly from the app — no new install, same eSIM. You'll also get a notification at 80% usage." },
];

const NOTIFICATIONS_INITIAL = [
  { id: "n1", icon: Sparkles,      title: "Welcome to Kalimi",       body: "Use WELCOME10 for 10% off your first eSIM.",  time: "Just now",   unread: true,  accent: "yellow" },
  { id: "n2", icon: AlertTriangle, title: "Data running low",        body: "You've used 92% of your Spain eSIM data.",    time: "2h ago",     unread: true,  accent: "danger" },
  { id: "n3", icon: CheckCircle2,  title: "Your eSIM is ready",      body: "Your Türkiye eSIM is installed and active.",  time: "Yesterday",  unread: false, accent: "success" },
  { id: "n4", icon: Tag,           title: "Japan: 20% off this week", body: "Spring sale on Japan plans — ends Sunday.",   time: "3 days ago", unread: false, accent: "yellow" },
];

const DEVICES = [
  { brand: "Google",  name: "Pixel 10",           category: "Phones" },
  { brand: "Xiaomi",  name: "14",                 category: "Phones" },
  { brand: "Samsung", name: "Galaxy Watch 7",     category: "Wearables" },
  { brand: "Samsung", name: "Galaxy Z Flip 6",    category: "Phones" },
  { brand: "Samsung", name: "Galaxy Z Fold 6",    category: "Phones" },
  { brand: "Google",  name: "Pixel 9",            category: "Phones" },
  { brand: "Google",  name: "Pixel Watch 3",      category: "Wearables" },
  { brand: "Xiaomi",  name: "13",                 category: "Phones" },
  { brand: "Apple",   name: "iPhone 15 Pro",      category: "Phones" },
  { brand: "Apple",   name: "iPhone 15",          category: "Phones" },
  { brand: "Apple",   name: "iPhone 14",          category: "Phones" },
  { brand: "Apple",   name: "iPad Pro",           category: "Tablets" },
  { brand: "Apple",   name: "iPad Air (5th)",     category: "Tablets" },
  { brand: "Apple",   name: "Watch Ultra 2",      category: "Wearables" },
  { brand: "Samsung", name: "Galaxy Tab S9",      category: "Tablets" },
];
const DEVICE_CATS = ["All", "Phones", "Tablets", "Wearables", "Apple", "Samsung", "Pixel"];

/* ============================================================
   ROOT
============================================================ */
export default function KalimiApp() {
  const [tab, setTab] = useState("shop");
  const [stack, setStack] = useState([]);
  const [data, setData] = useState({});
  const [hasEsims, setHasEsims] = useState(true);
  const [deviceSupported, setDeviceSupported] = useState(true);
  const [hasOnboarded, setHasOnboarded] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(true);
  const [popup, setPopup] = useState(null);
  const [cart, setCart] = useState([]);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState(NOTIFICATIONS_INITIAL);
  const unreadCount = notifications.filter((n) => n.unread).length;
  const [user, setUser] = useState({
    name: "Jamie Doe", email: "jamie@example.com",
    phone: "+44 7700 900123", country: "United Kingdom", initials: "JD",
  });
  const [myEsims, setMyEsims] = useState(MY_ESIMS_INITIAL);

  const push = (screen, payload = {}) => {
    setData((d) => ({ ...d, ...payload }));
    setStack((s) => [...s, screen]);
  };
  const pop = () => setStack((s) => s.slice(0, -1));
  const resetTo = (t) => { setTab(t); setStack([]); };
  const current = stack[stack.length - 1] || null;

  const addToCart = (item) => {
    setCart((c) => {
      const existing = c.find((x) => x.key === item.key);
      if (existing) return c.map((x) => (x.key === item.key ? { ...x, qty: x.qty + 1 } : x));
      return [...c, { ...item, qty: 1 }];
    });
  };
  const updateQty = (key, delta) => {
    setCart((c) => c.map((x) => (x.key === key ? { ...x, qty: Math.max(1, x.qty + delta) } : x)));
  };
  const removeFromCart = (key) => setCart((c) => c.filter((x) => x.key !== key));
  const cartCount = cart.reduce((a, b) => a + b.qty, 0);
  const cartTotal = cart.reduce(
    (a, b) => a + parseFloat(b.price.replace("$", "")) * b.qty,
    0
  );

  const markAllRead = () => setNotifications((n) => n.map((x) => ({ ...x, unread: false })));

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center py-8 px-4"
      style={{ background: "#F0F0F0", fontFamily: FONT_STACK }}
    >
      {/* Poppins webfont + anim keyframes injected via style tag */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
        @keyframes kalimi-slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
        @keyframes kalimi-fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes kalimi-spin { to { transform: rotate(360deg); } }
        @keyframes kalimi-slideInRight { from { transform: translateX(100%); } to { transform: translateX(0); } }
        .kalimi-slide-up { animation: kalimi-slideUp 0.3s cubic-bezier(0.2, 0.8, 0.2, 1); }
        .kalimi-slide-right { animation: kalimi-slideInRight 0.3s cubic-bezier(0.2, 0.8, 0.2, 1); }
        .kalimi-fade-in { animation: kalimi-fadeIn 0.2s ease-out; }
        .kalimi-spin { animation: kalimi-spin 1s linear infinite; }
        .kalimi-scroll::-webkit-scrollbar { width: 4px; }
        .kalimi-scroll::-webkit-scrollbar-thumb { background: #ddd; border-radius: 2px; }
      `}</style>

      <DevPanel
        hasEsims={hasEsims} setHasEsims={setHasEsims}
        deviceSupported={deviceSupported} setDeviceSupported={setDeviceSupported}
        hasOnboarded={hasOnboarded} setHasOnboarded={setHasOnboarded}
        isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn}
        setPopup={setPopup}
      />

      {/* Phone frame */}
      <div
        className="relative mt-6"
        style={{
          width: 390, height: 844, borderRadius: 54, padding: 10,
          background: "linear-gradient(160deg, #1a1a1a 0%, #2a2a2a 100%)",
          boxShadow: "0 50px 100px -30px rgba(0,0,0,0.4), 0 0 0 2px rgba(0,0,0,0.4) inset",
        }}
      >
        <div className="relative w-full h-full overflow-hidden" style={{ borderRadius: 44, background: B.bg }}>
          {/* Dynamic island */}
          <div
            className="absolute left-1/2 -translate-x-1/2 z-50"
            style={{ top: 10, width: 110, height: 32, borderRadius: 20, background: "#000" }}
          />

          {!hasOnboarded ? (
            <Onboarding onDone={() => setHasOnboarded(true)} />
          ) : !isSignedIn ? (
            <SignInScreen onDone={() => setIsSignedIn(true)} />
          ) : (
            <>
              <div className="h-12" />
              {!deviceSupported && <DeviceBanner onClick={() => push("compat")} />}

              <div
                className="flex flex-col"
                style={{ height: `calc(100% - ${!deviceSupported ? 96 : 48}px)` }}
              >
                <div className="flex-1 overflow-y-auto kalimi-scroll" style={{ background: B.bg }}>
                  {/* SHOP */}
                  {tab === "shop" && !current && (
                    <ShopHome
                      onCountry={(c) => push("country", { country: c })}
                      onSearch={() => push("search")}
                      onLang={() => setPopup("lang")}
                      onCart={() => push("cart")}
                      onSeeAll={() => push("allCountries")}
                      onMultiDest={() => push("multiDest")}
                      cartCount={cartCount}
                      unreadCount={unreadCount}
                      onNotif={() => { setNotifOpen(true); setTimeout(markAllRead, 1200); }}
                    />
                  )}
                  {tab === "shop" && current === "search" && (
                    <SearchScreen onBack={pop} onCountry={(c) => push("country", { country: c })} />
                  )}
                  {tab === "shop" && current === "allCountries" && (
                    <AllCountries onBack={pop} onCountry={(c) => push("country", { country: c })} />
                  )}
                  {tab === "shop" && current === "country" && (
                    <CountryDetail
                      country={data.country}
                      onBack={pop}
                      onAdd={(item) => { addToCart(item); push("cart"); }}
                      onCoverage={() => setPopup("coverage")}
                      onCompat={() => push("compat")}
                    />
                  )}
                  {tab === "shop" && current === "cart" && (
                    <CartScreen
                      cart={cart} updateQty={updateQty} removeFromCart={removeFromCart}
                      cartTotal={cartTotal} onBack={pop}
                      onCheckout={() => push("checkout")}
                      onShop={() => { setStack([]); setTab("shop"); }}
                    />
                  )}
                  {tab === "shop" && current === "checkout" && (
                    <Checkout cart={cart} cartTotal={cartTotal} onBack={pop} onPay={() => push("paying")} />
                  )}
                  {tab === "shop" && current === "paying" && (
                    <PayingScreen
                      onDone={() => {
                        const newSims = cart.map((c, i) => ({
                          id: `new-${Date.now()}-${i}`,
                          country: c.countryName, flag: c.flag, data: c.data,
                          used: 0, total: parseFloat(c.data) || 5,
                          days: c.days, daysLeft: c.days, status: "not_installed",
                          iccid: `8990-${Math.random().toString().slice(2, 6)}-${Math.random().toString().slice(2, 6)}-${Math.random().toString().slice(2, 6)}-${Math.random().toString().slice(2, 6)}`,
                        }));
                        setMyEsims((prev) => [...newSims, ...prev]);
                        setCart([]);
                        setStack([]);
                        setTab("esims");
                        setHasEsims(true);
                        setTimeout(() => push("install", { sim: newSims[0] }), 200);
                      }}
                    />
                  )}
                  {tab === "shop" && current === "multiDest" && (
                    <MultiDestination
                      onBack={pop}
                      onResults={(trip) => push("multiResults", { trip })}
                      onRegional={() => push("regionalList")}
                    />
                  )}
                  {tab === "shop" && current === "multiResults" && (
                    <MultiResults
                      trip={data.trip} onBack={pop}
                      onAdd={(item) => { addToCart(item); push("cart"); }}
                    />
                  )}
                  {tab === "shop" && current === "regionalList" && (
                    <RegionalList onBack={pop} onRegion={(r) => push("regionDetail", { region: r })} />
                  )}
                  {tab === "shop" && current === "regionDetail" && (
                    <RegionDetail
                      region={data.region} onBack={pop}
                      onAdd={(item) => { addToCart(item); push("cart"); }}
                    />
                  )}

                  {/* MY ESIMS */}
                  {tab === "esims" && !current && (
                    <MyEsims
                      hasEsims={hasEsims && myEsims.length > 0}
                      esims={myEsims}
                      onShop={() => resetTo("shop")}
                      onHow={() => push("how")}
                      onSim={(s) => push("simDetail", { sim: s })}
                    />
                  )}
                  {tab === "esims" && current === "how" && <HowItWorks onBack={pop} />}
                  {tab === "esims" && current === "simDetail" && (
                    <EsimDetail
                      sim={data.sim} onBack={pop}
                      onTopUp={() => setPopup("topup")}
                      onInstall={() => push("install", { sim: data.sim })}
                      onGuide={() => push("installGuide")}
                    />
                  )}
                  {(tab === "esims" || tab === "shop") && current === "install" && (
                    <InstallFlow
                      sim={data.sim}
                      onDone={() => {
                        setMyEsims((prev) =>
                          prev.map((s) => (s.id === data.sim.id ? { ...s, status: "active", used: 0 } : s))
                        );
                        setStack([]);
                        setTab("esims");
                      }}
                      onBack={pop}
                    />
                  )}
                  {tab === "esims" && current === "installGuide" && <InstallGuide onBack={pop} />}

                  {/* HELP */}
                  {tab === "help" && !current && (
                    <HelpHome
                      onFaq={() => push("faqs")}
                      onChat={() => push("chat")}
                      onCompat={() => push("compat")}
                      onInstall={() => push("installGuide")}
                    />
                  )}
                  {tab === "help" && current === "faqs" && (
                    <FaqList onBack={pop} onItem={(q) => push("faq", { faq: q })} />
                  )}
                  {tab === "help" && current === "faq" && (
                    <FaqArticle faq={data.faq} onBack={pop} onChat={() => push("chat")} />
                  )}
                  {tab === "help" && current === "chat" && <ChatScreen onBack={pop} />}
                  {tab === "help" && current === "installGuide" && <InstallGuide onBack={pop} />}

                  {(tab === "help" || tab === "shop" || tab === "esims") && current === "compat" && (
                    <CompatCheck
                      onBack={pop} setDeviceSupported={setDeviceSupported}
                      onSuccess={() => { setDeviceSupported(true); setPopup("compatOK"); }}
                    />
                  )}

                  {/* PROFILE */}
                  {tab === "profile" && !current && (
                    <ProfileHome
                      user={user}
                      onItem={(k) => push(k)}
                      onEdit={() => push("personal")}
                      onLogout={() => setPopup("logout")}
                    />
                  )}
                  {tab === "profile" && current === "personal" && (
                    <PersonalInfo user={user} setUser={setUser} onBack={pop} />
                  )}
                  {tab === "profile" && current === "payments" && <PaymentMethods onBack={pop} />}
                  {tab === "profile" && current === "notifications" && <NotificationsSettings onBack={pop} />}
                  {tab === "profile" && current === "orders" && <OrderHistory onBack={pop} />}
                  {tab === "profile" && current === "settings" && (
                    <SettingsScreen onBack={pop} onLang={() => setPopup("lang")} />
                  )}
                  {tab === "profile" && current === "about" && <AboutScreen onBack={pop} />}
                </div>

                <TabBar tab={tab} onChange={resetTo} />
              </div>
            </>
          )}

          {/* Notifications slideout */}
          {notifOpen && (
            <NotifSlideout
              notifications={notifications}
              onClose={() => setNotifOpen(false)}
              onClear={() => setNotifications([])}
            />
          )}

          {/* Modals */}
          {popup === "incompatible" && (
            <IncompatiblePopup
              onClose={() => { setPopup(null); setDeviceSupported(false); }}
            />
          )}
          {popup === "email" && <EmailOptInPopup onClose={() => setPopup(null)} />}
          {popup === "lang" && <LangCurrencyPopup onClose={() => setPopup(null)} />}
          {popup === "location" && <LocationPermPopup onClose={() => setPopup(null)} />}
          {popup === "push" && <PushPermPopup onClose={() => setPopup(null)} />}
          {popup === "lowdata" && <LowDataPopup onClose={() => setPopup(null)} />}
          {popup === "topup" && <TopUpPopup onClose={() => setPopup(null)} />}
          {popup === "logout" && (
            <LogoutPopup
              onClose={() => setPopup(null)}
              onConfirm={() => { setPopup(null); setIsSignedIn(false); }}
            />
          )}
          {popup === "compatOK" && <CompatOkPopup onClose={() => setPopup(null)} />}
          {popup === "coverage" && <CoverageModal onClose={() => setPopup(null)} />}
        </div>
      </div>

      <p className="mt-6 text-xs text-gray-500 max-w-md text-center leading-relaxed">
        Dev panel above the phone lets you flip between states and trigger any popup.
      </p>
    </div>
  );
}

/* ============================================================
   DEV PANEL
============================================================ */
function DevPanel({
  hasEsims, setHasEsims, deviceSupported, setDeviceSupported,
  hasOnboarded, setHasOnboarded, isSignedIn, setIsSignedIn, setPopup,
}) {
  const popups = [
    ["incompatible", "Incompatible"], ["email", "Email opt-in"], ["lang", "Lang"],
    ["location", "Location"], ["push", "Push"], ["lowdata", "Low data"],
    ["topup", "Top up"], ["logout", "Logout"], ["compatOK", "Compat ✓"], ["coverage", "Coverage"],
  ];
  return (
    <div className="flex flex-col gap-2 items-center">
      <div className="flex flex-wrap gap-2 items-center justify-center max-w-3xl">
        <Pill active={!hasOnboarded} onClick={() => setHasOnboarded(!hasOnboarded)}
          label={hasOnboarded ? "Show onboarding" : "Onboarding ✓"} />
        <Pill active={!isSignedIn} onClick={() => setIsSignedIn(!isSignedIn)}
          label={isSignedIn ? "Sign out (dev)" : "Signed out"} />
        <Pill active={hasEsims} onClick={() => setHasEsims(!hasEsims)}
          label={hasEsims ? "Has eSIMs" : "No eSIMs"} />
        <Pill active={!deviceSupported} onClick={() => setDeviceSupported(!deviceSupported)}
          label={deviceSupported ? "Compatible" : "NOT compatible"} />
      </div>
      <div className="flex flex-wrap gap-1.5 items-center justify-center max-w-3xl">
        <span className="text-[10px] uppercase tracking-wider text-gray-500 mr-1">Popups:</span>
        {popups.map(([k, label]) => (
          <button key={k} onClick={() => setPopup(k)}
            className="px-2.5 py-1 rounded-full text-[11px] font-medium border border-gray-300 bg-white hover:bg-gray-50">
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

function Pill({ active, onClick, label }) {
  return (
    <button onClick={onClick}
      className="px-3 py-1.5 rounded-full text-xs font-semibold transition"
      style={{ background: active ? B.yellow : "white", color: B.ink, border: `1px solid ${active ? B.yellow : B.line}` }}>
      {label}
    </button>
  );
}

/* ============================================================
   LOGO
============================================================ */
function Logo({ size = 22 }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-end gap-[2px]" style={{ height: size }}>
        <div style={{ width: size * 0.18, height: size * 0.35, background: B.yellow, borderRadius: 1 }} />
        <div style={{ width: size * 0.18, height: size * 0.6,  background: B.yellow, borderRadius: 1 }} />
        <div style={{ width: size * 0.18, height: size * 0.9,  background: B.yellow, borderRadius: 1 }} />
      </div>
      <span style={{ fontSize: size * 0.95, fontWeight: 700, letterSpacing: "-0.03em", color: B.ink, lineHeight: 1 }}>
        {B.name}
      </span>
    </div>
  );
}

/* ============================================================
   BANNER
============================================================ */
function DeviceBanner({ onClick }) {
  return (
    <button onClick={onClick} className="w-full px-4 py-2.5 flex items-center gap-2"
      style={{ background: B.dangerSoft, borderBottom: `1px solid ${B.line}` }}>
      <AlertTriangle size={16} color={B.danger} />
      <span className="text-xs font-semibold leading-tight flex-1 text-left" style={{ color: B.danger }}>
        Your device does not support eSIM
      </span>
      <ChevronRight size={14} color={B.danger} />
    </button>
  );
}

/* ============================================================
   ONBOARDING
============================================================ */
function Onboarding({ onDone }) {
  const [i, setI] = useState(0);
  const slides = [
    { Icon: Globe,   title: "200+ destinations",   body: "Stay connected in the countries you travel to — no roaming surprises." },
    { Icon: QrCode,  title: "Set up in 2 minutes", body: "Scan a QR code, follow the steps — you're ready before you leave home." },
    { Icon: Plane,   title: "Online the moment you land", body: "Your plan activates as soon as you connect at your destination." },
  ];
  const last = i === slides.length - 1;
  const S = slides[i];
  return (
    <div className="absolute inset-0 flex flex-col kalimi-fade-in" style={{ background: B.bg }}>
      <div className="h-14" />
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        <div className="w-24 h-24 rounded-full flex items-center justify-center mb-8" style={{ background: B.yellow }}>
          <S.Icon size={36} color={B.ink} strokeWidth={1.8} />
        </div>
        <Headline>{S.title}</Headline>
        <p className="text-sm mt-3 leading-relaxed" style={{ color: B.sub }}>{S.body}</p>
      </div>
      <div className="flex justify-center gap-1.5 mb-6">
        {slides.map((_, idx) => (
          <div key={idx} className="rounded-full transition-all"
            style={{ width: idx === i ? 20 : 6, height: 6, background: idx === i ? B.ink : B.line }} />
        ))}
      </div>
      <div className="px-6 pb-8">
        <PillButton onClick={() => (last ? onDone() : setI(i + 1))} primary>
          {last ? "Get started" : "Next"}
        </PillButton>
        {!last && (
          <button onClick={onDone} className="w-full py-3 text-sm font-semibold mt-2" style={{ color: B.sub }}>Skip</button>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   SIGN IN
============================================================ */
function SignInScreen({ onDone }) {
  const [mode, setMode] = useState("email"); // email | password | code
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isRegister, setIsRegister] = useState(false);
  const codeRefs = useRef([]);

  const handleCodeChange = (idx, val) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...code];
    next[idx] = val;
    setCode(next);
    if (val && idx < 5) codeRefs.current[idx + 1]?.focus();
  };

  return (
    <div className="absolute inset-0 flex flex-col kalimi-fade-in" style={{ background: B.bg }}>
      <div className="h-14" />
      <div className="px-6 pt-4 pb-6 flex justify-center"><Logo size={26} /></div>
      <div className="flex-1 px-6 overflow-y-auto kalimi-scroll">
        <h2 className="text-xl font-bold mb-1" style={{ color: B.ink, letterSpacing: "-0.02em" }}>
          {mode === "code" ? "Enter your code" : isRegister ? "Create your account" : "Sign in to continue"}
        </h2>
        <p className="text-xs mb-5" style={{ color: B.sub }}>
          {mode === "code"
            ? `We sent a 6-digit code to ${email || "your email"}`
            : isRegister
              ? "Join Kalimi and get 10% off your first eSIM"
              : "Enter your credentials to access your account"}
        </p>

        {mode !== "code" && (
          <>
            <label className="text-xs font-semibold block mb-1.5" style={{ color: B.ink }}>Email</label>
            <input
              type="email" autoFocus placeholder="you@example.com"
              value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full text-sm outline-none px-4 py-3 mb-3"
              style={{ background: "white", border: `2px solid ${B.yellow}`, borderRadius: 12, color: B.ink }}
            />

            {mode === "password" && (
              <>
                <label className="text-xs font-semibold block mb-1.5" style={{ color: B.ink }}>Password</label>
                <input
                  type="password" placeholder="••••••••"
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-sm outline-none px-4 py-3 mb-2"
                  style={{ background: "white", border: `1px solid ${B.line}`, borderRadius: 12, color: B.ink }}
                />
                <button className="text-xs font-semibold mb-3" style={{ color: B.ink }}>Forgot password?</button>
              </>
            )}

            <div className="h-2" />
            <PillButton onClick={() => (mode === "password" ? onDone() : setMode("code"))} primary>
              {mode === "password" ? (isRegister ? "Create account" : "Sign in") : "Send sign-in code"}
            </PillButton>

            <button onClick={() => setMode(mode === "password" ? "email" : "password")}
              className="w-full py-3 text-sm font-semibold mt-1" style={{ color: B.sub }}>
              {mode === "password" ? "Use code instead" : "Use password instead"}
            </button>

            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-px" style={{ background: B.line }} />
              <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: B.sub }}>
                or continue with
              </span>
              <div className="flex-1 h-px" style={{ background: B.line }} />
            </div>

            <button
              onClick={onDone}
              className="w-full py-3.5 rounded-xl flex items-center justify-center gap-2.5 text-sm font-semibold"
              style={{ background: "white", border: `1px solid ${B.line}`, color: B.ink2 }}
            >
              <GoogleG />
              Continue with Google
            </button>

            <div className="text-center mt-6 mb-8">
              <button
                onClick={() => setIsRegister(!isRegister)}
                className="text-sm font-semibold underline underline-offset-4"
                style={{ color: B.ink }}
              >
                {isRegister ? "Already have an account? Sign in" : "Register"}
              </button>
            </div>
          </>
        )}

        {mode === "code" && (
          <>
            <div className="flex gap-2 justify-between mb-4">
              {code.map((c, i) => (
                <input
                  key={i}
                  ref={(el) => (codeRefs.current[i] = el)}
                  value={c}
                  onChange={(e) => handleCodeChange(i, e.target.value)}
                  maxLength={1} inputMode="numeric"
                  className="w-11 h-12 text-center text-lg font-bold outline-none"
                  style={{ background: "white", border: `2px solid ${c ? B.yellow : B.line}`, borderRadius: 12, color: B.ink }}
                />
              ))}
            </div>
            <PillButton onClick={onDone} primary disabled={code.some((c) => !c)}>
              Verify & continue
            </PillButton>
            <button onClick={() => setMode("email")}
              className="w-full py-3 text-sm font-semibold mt-1" style={{ color: B.sub }}>
              Change email
            </button>
            <div className="text-center mt-4">
              <span className="text-xs" style={{ color: B.sub }}>Didn't get the code? </span>
              <button className="text-xs font-semibold" style={{ color: B.ink }}>Resend in 30s</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function GoogleG() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48">
      <path fill="#FFC107" d="M43.6,20.5H42V20.4H24v7.2h11.3c-1.5,4.2-5.5,7.2-10.3,7.2c-6.1,0-11-4.9-11-11s4.9-11,11-11c2.8,0,5.4,1.1,7.4,2.8l5.1-5.1C34.2,7.7,29.3,5.8,24,5.8C13.9,5.8,5.8,13.9,5.8,24S13.9,42.2,24,42.2c10.1,0,18.2-8.1,18.2-18.2C42.2,22.7,42,21.6,43.6,20.5z" />
      <path fill="#FF3D00" d="M7.3,14.7l5.9,4.3C14.9,15.1,19.1,12,24,12c2.8,0,5.4,1.1,7.4,2.8l5.1-5.1C34.2,7.7,29.3,5.8,24,5.8C16.7,5.8,10.4,9.5,7.3,14.7z" />
      <path fill="#4CAF50" d="M24,42.2c5.2,0,10-1.9,13.7-5.1l-5.6-4.8c-2.1,1.5-4.7,2.4-7.5,2.4c-4.8,0-8.8-2.9-10.3-7.1l-5.9,4.5C11.3,38.6,17.2,42.2,24,42.2z" />
      <path fill="#1976D2" d="M43.6,20.5H42V20.4H24v7.2h11.3c-0.7,2-1.9,3.7-3.5,5l5.6,4.8c-0.4,0.4,6.6-4.8,6.6-13.5C43.9,22.7,43.8,21.6,43.6,20.5z" />
    </svg>
  );
}

/* ============================================================
   PRIMITIVES
============================================================ */
function Headline({ children, size = 26, underline }) {
  return (
    <h1 style={{ fontSize: size, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1, color: B.ink }}>
      {underline ? (
        <>
          <span style={{
            backgroundImage: `linear-gradient(180deg, transparent 55%, ${B.yellow} 55%, ${B.yellow} 88%, transparent 88%)`,
            paddingInline: 2,
          }}>{underline}</span>
          {" "}{children}
        </>
      ) : children}
    </h1>
  );
}

function PillButton({ children, onClick, primary, secondary, Icon: I, disabled }) {
  const styles = primary
    ? { background: B.yellow, color: B.ink }
    : secondary
      ? { background: B.ink, color: "white" }
      : { background: "white", color: B.ink, border: `1px solid ${B.line}` };
  return (
    <button
      onClick={onClick} disabled={disabled}
      className="w-full rounded-full py-4 text-sm font-bold transition flex items-center justify-center gap-2"
      style={{ ...styles, opacity: disabled ? 0.5 : 1 }}
    >
      {I && <I size={14} />}
      {children}
    </button>
  );
}

function Card({ children, className = "", onClick, noPad, style }) {
  return (
    <div
      onClick={onClick}
      className={className}
      style={{
        background: "white",
        border: `1px solid ${B.line}`,
        borderRadius: 20,
        padding: noPad ? 0 : 16,
        cursor: onClick ? "pointer" : "default",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function BackHeader({ title, onBack, right }) {
  return (
    <div className="px-5 pt-3 pb-2 flex items-center gap-3">
      <button onClick={onBack}
        className="w-10 h-10 rounded-full flex items-center justify-center"
        style={{ background: "white", border: `1px solid ${B.line}` }}>
        <ChevronLeft size={20} color={B.ink} />
      </button>
      <h2 className="text-base font-bold flex-1" style={{ color: B.ink, letterSpacing: "-0.02em" }}>{title}</h2>
      {right}
    </div>
  );
}

/* ============================================================
   SHOP HOME
============================================================ */
function ShopHome({ onCountry, onSearch, onLang, onCart, onSeeAll, onMultiDest, cartCount, unreadCount, onNotif }) {
  const [region, setRegion] = useState("local");
  return (
    <div className="px-5 pt-2 pb-6">
      <div className="flex items-center justify-between mb-5">
        <Logo size={22} />
        <div className="flex items-center gap-2">
          <button onClick={onLang}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold"
            style={{ background: "white", border: `1px solid ${B.line}`, color: B.ink }}>
            <Globe size={13} /> EN · $
          </button>
          <button onClick={onNotif}
            className="w-9 h-9 rounded-full flex items-center justify-center relative"
            style={{ background: "white", border: `1px solid ${B.line}` }}>
            <Bell size={16} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full"
                style={{ background: B.danger, color: "white" }}>{unreadCount}</span>
            )}
          </button>
          <button onClick={onCart}
            className="w-9 h-9 rounded-full flex items-center justify-center relative"
            style={{ background: "white", border: `1px solid ${B.line}` }}>
            <ShoppingCart size={16} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full"
                style={{ background: B.yellow, color: B.ink }}>{cartCount}</span>
            )}
          </button>
        </div>
      </div>

      <div className="mb-6">
        <Headline underline="Mobile data" size={28}>made affordable</Headline>
        <p className="text-sm mt-3 leading-relaxed" style={{ color: B.sub }}>
          Choose from 200+ destinations. No contract, no roaming fees.
        </p>
      </div>

      <button onClick={onSearch}
        className="w-full flex items-center gap-3 mb-5"
        style={{ background: "white", border: `2px solid ${B.yellow}`, borderRadius: 999, padding: "12px 6px 12px 18px" }}>
        <span className="text-sm flex-1 text-left" style={{ color: B.sub }}>Where are you travelling to?</span>
        <span className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: B.yellow }}>
          <Search size={16} color={B.ink} strokeWidth={2.5} />
        </span>
      </button>

      <div className="rounded-2xl p-4 mb-4 relative overflow-hidden" style={{ background: B.ink, color: "white" }}>
        <div className="flex items-start gap-3 relative z-10">
          <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: B.yellow }}>
            <Sparkles size={18} color={B.ink} />
          </div>
          <div>
            <div className="text-sm font-bold">10% off your first eSIM</div>
            <div className="text-xs opacity-80 mt-0.5">
              Use code <span className="font-mono font-bold" style={{ color: B.yellow }}>WELCOME10</span> at checkout
            </div>
          </div>
        </div>
        <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full opacity-10" style={{ background: B.yellow }} />
      </div>

      <button onClick={onMultiDest}
        className="w-full rounded-2xl p-4 mb-5 flex items-center gap-3 text-left transition"
        style={{ background: B.yellowSoft, border: `1px solid ${B.yellow}` }}>
        <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "white" }}>
          <Map size={18} color={B.ink} />
        </div>
        <div className="flex-1">
          <div className="text-sm font-bold" style={{ color: B.ink }}>Travelling to multiple places?</div>
          <div className="text-xs" style={{ color: B.ink2 }}>We'll find the best plan for your trip</div>
        </div>
        <ChevronRight size={16} color={B.ink} />
      </button>

      <div className="grid grid-cols-4 gap-1 mb-6 rounded-2xl py-3 px-1" style={{ background: B.yellowSoft }}>
        <MiniFeat Icon={Globe}      label="200+" sub="Destinations" />
        <MiniFeat Icon={Tag}         label="Low"  sub="Prices" />
        <MiniFeat Icon={QrCode}      label="Easy" sub="Install" />
        <MiniFeat Icon={Smartphone}  label="Keep" sub="Number" />
      </div>

      <div className="flex gap-2 mb-4">
        {REGIONS.map((r) => (
          <button key={r.key} onClick={() => setRegion(r.key)}
            className="px-4 py-2 rounded-full text-sm font-semibold transition"
            style={{
              background: region === r.key ? B.ink : "white",
              color: region === r.key ? "white" : B.ink,
              border: `1px solid ${region === r.key ? B.ink : B.line}`,
            }}>
            {r.label}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold" style={{ color: B.ink }}>Popular destinations</h3>
        <button onClick={onSeeAll} className="text-xs font-semibold" style={{ color: B.ink }}>See all →</button>
      </div>

      <div className="flex flex-col gap-2">
        {COUNTRIES.slice(0, 8).map((c) => <CountryRow key={c.code} c={c} onClick={() => onCountry(c)} />)}
      </div>
    </div>
  );
}

function CountryRow({ c, onClick }) {
  return (
    <button onClick={onClick}
      className="flex items-center gap-3 p-3 rounded-2xl transition active:scale-[0.99]"
      style={{ background: "white", border: `1px solid ${B.line}` }}>
      <div className="w-11 h-11 rounded-full flex items-center justify-center text-2xl"
        style={{ background: B.lineSoft }}>{c.flag}</div>
      <div className="flex-1 text-left">
        <div className="text-sm font-bold" style={{ color: B.ink }}>{c.name}</div>
        <div className="text-xs" style={{ color: B.sub }}>
          {c.plans} plans • from <span style={{ color: B.ink, fontWeight: 600 }}>{c.from}</span>
        </div>
      </div>
      <ChevronRight size={16} color={B.sub} />
    </button>
  );
}

function MiniFeat({ Icon: I, label, sub }) {
  return (
    <div className="flex flex-col items-center py-1">
      <div style={{ color: B.ink }} className="mb-1"><I size={14} /></div>
      <div className="text-[11px] font-bold" style={{ color: B.ink }}>{label}</div>
      <div className="text-[9px]" style={{ color: B.sub }}>{sub}</div>
    </div>
  );
}

/* ============================================================
   ALL COUNTRIES
============================================================ */
function AllCountries({ onBack, onCountry }) {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Europe", "Asia", "Americas", "Africa"];
  const filtered = COUNTRIES.filter((c) => c.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <div>
      <BackHeader title="All destinations" onBack={onBack} />
      <div className="px-5 pb-6">
        <div className="flex items-center gap-2 mb-4"
          style={{ background: B.lineSoft, borderRadius: 999, padding: "10px 16px" }}>
          <Search size={16} color={B.sub} />
          <input value={q} onChange={(e) => setQ(e.target.value)}
            placeholder="Search all destinations"
            className="flex-1 text-sm outline-none bg-transparent" />
        </div>
        <div className="flex gap-2 mb-4 overflow-x-auto pb-1 -mx-5 px-5">
          {filters.map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className="px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap"
              style={{
                background: filter === f ? B.yellow : "white",
                color: B.ink,
                border: `1px solid ${filter === f ? B.yellow : B.line}`,
              }}>
              {f}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {filtered.map((c) => <CountryRow key={c.code} c={c} onClick={() => onCountry(c)} />)}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   SEARCH
============================================================ */
function SearchScreen({ onBack, onCountry }) {
  const [q, setQ] = useState("");
  const filtered = COUNTRIES.filter((c) => c.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <div>
      <div className="px-5 pt-3 pb-2 flex items-center gap-2">
        <button onClick={onBack}
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: "white", border: `1px solid ${B.line}` }}>
          <ChevronLeft size={20} />
        </button>
        <div className="flex-1 flex items-center gap-2"
          style={{ background: "white", border: `2px solid ${B.yellow}`, borderRadius: 999, padding: "10px 16px" }}>
          <Search size={16} color={B.ink} />
          <input autoFocus value={q} onChange={(e) => setQ(e.target.value)}
            placeholder="Search destinations"
            className="flex-1 text-sm outline-none bg-transparent" style={{ color: B.ink }} />
          {q && <button onClick={() => setQ("")}><X size={15} color={B.sub} /></button>}
        </div>
      </div>
      <div className="px-5 pt-3 pb-6">
        {q === "" && (
          <>
            <div className="text-xs font-bold mb-2" style={{ color: B.sub }}>RECENT</div>
            <div className="flex flex-wrap gap-2 mb-5">
              {["Türkiye", "Japan", "Spain"].map((t) => (
                <button key={t} onClick={() => {
                  const c = COUNTRIES.find((x) => x.name === t);
                  if (c) onCountry(c);
                }}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold"
                  style={{ background: B.lineSoft, color: B.ink }}>{t}</button>
              ))}
            </div>
            <div className="text-xs font-bold mb-2" style={{ color: B.sub }}>TRENDING</div>
          </>
        )}
        <div className="flex flex-col gap-2">
          {filtered.map((c) => <CountryRow key={c.code} c={c} onClick={() => onCountry(c)} />)}
          {filtered.length === 0 && (
            <div className="text-center py-10 text-sm" style={{ color: B.sub }}>
              No destinations match "{q}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   COUNTRY DETAIL
============================================================ */
function CountryDetail({ country, onBack, onAdd, onCoverage, onCompat }) {
  const groups = planGroups[country.code] || planGroups.default;
  const [selected, setSelected] = useState(null);
  const [qty, setQty] = useState(1);

  const allPlans = groups.flatMap((g) => g.options.map((o) => ({ ...o, duration: g.duration })));
  const selPlan = allPlans.find((p) => p.id === selected);
  const price = selPlan ? parseFloat(selPlan.price.replace("$", "")) * qty : 0;

  return (
    <div className="flex flex-col h-full">
      <BackHeader title="" onBack={onBack} />
      <div className="flex-1 overflow-y-auto kalimi-scroll px-5 pb-4">
        <div className="rounded-3xl overflow-hidden mb-4 relative"
          style={{ aspectRatio: "16/11", background: B.yellowSoft, border: `1px solid ${B.line}` }}>
          <img src={heroImage(country.name)} alt={country.name}
            className="w-full h-full object-cover"
            onError={(e) => { e.target.style.display = "none"; }} />
          <div className="absolute top-4 left-4 text-[10px] uppercase tracking-wider font-bold" style={{ color: B.ink }}>
            eSIM for
          </div>
          <div className="absolute top-10 left-4 text-3xl font-bold" style={{ color: B.ink, letterSpacing: "-0.02em" }}>
            {country.name}
          </div>
          <div className="absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center text-2xl"
            style={{ background: "white", border: `2px solid ${B.line}` }}>{country.flag}</div>
        </div>

        <p className="text-xs mb-4 leading-relaxed" style={{ color: B.sub }}>
          Before purchasing an eSIM, please make sure your phone is eSIM-compatible and not locked by your current carrier. If you are unsure,{" "}
          <button onClick={onCompat} className="font-semibold underline" style={{ color: B.ink }}>click here</button>.
        </p>

        <div className="mb-2">
          <h3 className="text-base font-bold" style={{ color: B.ink }}>eSIM Plans</h3>
          <p className="text-xs" style={{ color: B.sub }}>Buy mobile data for planned stays.</p>
        </div>

        <div className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs mb-4"
          style={{ background: B.lineSoft, color: B.ink }}>
          <MapPin size={12} /> Valid only in {country.name}
        </div>

        {groups.map((group, gIdx) => (
          <div key={gIdx} className="mb-4">
            <div className="text-xs font-semibold mb-2" style={{ color: B.sub }}>{group.duration}</div>
            <div className="flex flex-col gap-2">
              {group.options.map((p) => {
                const isSel = selected === p.id;
                return (
                  <button key={p.id} onClick={() => setSelected(p.id)}
                    className="flex items-center justify-between p-4 rounded-2xl transition text-left"
                    style={{
                      background: isSel ? B.yellowSoft : "white",
                      border: `2px solid ${isSel ? B.yellow : B.line}`,
                    }}>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center"
                        style={{
                          border: `2px solid ${isSel ? B.yellow : B.line}`,
                          background: isSel ? B.yellow : "white",
                        }}>
                        {isSel && <div className="w-2 h-2 rounded-full" style={{ background: B.ink }} />}
                      </div>
                      <span className="text-sm font-bold" style={{ color: B.ink }}>{p.data}</span>
                    </div>
                    <span className="text-sm font-bold" style={{ color: B.ink }}>{p.price}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        <div className="text-[10px] uppercase tracking-wider font-bold mb-2 mt-5" style={{ color: B.sub }}>Plan details</div>
        <Card className="mb-4">
          <PlanDetailRow Icon={Wifi}           label="Network"    value={<NetworkList net={PLAN_DETAILS_DEFAULT.network} />} />
          <PlanDetailRow Icon={RefreshCw}      label="Top-up"     value={PLAN_DETAILS_DEFAULT.topup} />
          <PlanDetailRow Icon={Radio}          label="Hotspot"    value={PLAN_DETAILS_DEFAULT.hotspot} />
          <PlanDetailRow Icon={Clock}          label="Activation" value={PLAN_DETAILS_DEFAULT.activation} withInfo />
          <PlanDetailRow Icon={QrCode}         label="Delivery"   value={PLAN_DETAILS_DEFAULT.delivery} />
          <PlanDetailRow Icon={MessageCircle}  label="SMS/Calls"  value={PLAN_DETAILS_DEFAULT.sms} last />
        </Card>

        <Card className="mb-4" onClick={onCoverage}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold" style={{ color: B.ink }}>
              Also usable in {COVERAGE_COUNTRIES.length} countries
            </span>
            <span className="text-xs font-semibold flex items-center gap-0.5" style={{ color: B.yellowDeep }}>
              View All <ChevronRight size={12} color={B.yellowDeep} />
            </span>
          </div>
          <div className="flex gap-1">
            {COVERAGE_COUNTRIES.slice(0, 9).map((c, i) => (
              <div key={i} className="w-7 h-7 rounded-full flex items-center justify-center text-sm overflow-hidden"
                style={{ background: B.lineSoft }}>{c.flag}</div>
            ))}
          </div>
        </Card>
      </div>

      {selPlan ? (
        <div className="px-5 py-3 flex items-center gap-3"
          style={{ background: "white", borderTop: `1px solid ${B.line}` }}>
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-lg flex-shrink-0"
              style={{ background: B.yellowSoft }}>{country.flag}</div>
            <div className="min-w-0">
              <div className="text-xs font-bold truncate" style={{ color: B.ink }}>{country.name}</div>
              <div className="text-[10px] truncate" style={{ color: B.sub }}>
                {selPlan.duration} • {selPlan.data}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 px-1 py-1 rounded-full" style={{ background: B.lineSoft }}>
            <button onClick={() => setQty(Math.max(1, qty - 1))}
              className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "white" }}>
              <Minus size={12} />
            </button>
            <span className="text-sm font-bold w-5 text-center">{qty}</span>
            <button onClick={() => setQty(qty + 1)}
              className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "white" }}>
              <Plus size={12} />
            </button>
          </div>
          <button onClick={() => onAdd({
            key: `${country.code}-${selPlan.id}-${Date.now()}`,
            countryCode: country.code, countryName: country.name, flag: country.flag,
            planId: selPlan.id, duration: selPlan.duration, data: selPlan.data,
            days: parseInt(selPlan.duration) || 30, price: selPlan.price,
          })}
            className="flex items-center gap-1.5 px-4 py-3 rounded-full text-xs font-bold flex-shrink-0"
            style={{ background: B.yellow, color: B.ink }}>
            <ShoppingCart size={13} color={B.ink} />
            ${price.toFixed(2)}
          </button>
        </div>
      ) : (
        <div className="px-5 py-3 text-center text-xs"
          style={{ background: "white", borderTop: `1px solid ${B.line}`, color: B.sub }}>
          Select a plan to continue
        </div>
      )}
    </div>
  );
}

function PlanDetailRow({ Icon: I, label, value, withInfo, last }) {
  return (
    <div className="flex items-start gap-3 py-2.5"
      style={{ borderBottom: last ? "none" : `1px solid ${B.lineSoft}` }}>
      <I size={15} color={B.sub} style={{ marginTop: 2 }} />
      <span className="text-xs w-20 flex-shrink-0" style={{ color: B.sub }}>{label}</span>
      <div className="flex-1 text-xs font-semibold flex items-start gap-1" style={{ color: B.ink }}>
        <span className="flex-1">{value}</span>
        {withInfo && <Info size={12} color={B.sub} />}
      </div>
    </div>
  );
}

function NetworkList({ net }) {
  return (
    <div>
      <div className="flex items-center flex-wrap gap-x-2 gap-y-1">
        {net.names.map((n, i) => (
          <span key={i} className="flex items-center gap-1">
            {n}
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded"
              style={{ background: B.lineSoft, color: B.sub }}>{net.generation}</span>
            {i < net.names.length - 1 && ","}
          </span>
        ))}
      </div>
      <div className="text-[10px] mt-0.5" style={{ color: B.sub }}>+ {net.more} more</div>
    </div>
  );
}

/* ============================================================
   CART
============================================================ */
function CartScreen({ cart, updateQty, removeFromCart, cartTotal, onBack, onCheckout, onShop }) {
  return (
    <div className="flex flex-col h-full">
      <BackHeader title="Your cart" onBack={onBack} />
      {cart.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
            style={{ background: B.yellowSoft }}>
            <ShoppingCart size={32} color={B.ink} />
          </div>
          <h3 className="text-lg font-bold mb-2" style={{ color: B.ink }}>Your cart is empty</h3>
          <p className="text-sm mb-5" style={{ color: B.sub }}>Browse destinations and find the right eSIM for your trip.</p>
          <div className="w-full max-w-xs"><PillButton onClick={onShop} primary>Shop eSIMs</PillButton></div>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto kalimi-scroll px-5 py-3">
            <div className="flex flex-col gap-3 mb-4">
              {cart.map((item) => (
                <Card key={item.key}>
                  <div className="flex gap-3">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                      style={{ background: B.yellowSoft }}>{item.flag}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="text-sm font-bold" style={{ color: B.ink }}>{item.countryName}</div>
                          <div className="text-xs" style={{ color: B.sub }}>{item.data} • {item.duration}</div>
                        </div>
                        <button onClick={() => removeFromCart(item.key)}>
                          <Trash2 size={15} color={B.sub} />
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-1 px-1 py-1 rounded-full" style={{ background: B.lineSoft }}>
                          <button onClick={() => updateQty(item.key, -1)}
                            className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "white" }}>
                            <Minus size={11} />
                          </button>
                          <span className="text-xs font-bold w-5 text-center">{item.qty}</span>
                          <button onClick={() => updateQty(item.key, 1)}
                            className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "white" }}>
                            <Plus size={11} />
                          </button>
                        </div>
                        <span className="text-sm font-bold" style={{ color: B.ink }}>
                          ${(parseFloat(item.price.replace("$", "")) * item.qty).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            <Card style={{ background: B.yellowSoft, borderColor: B.yellow }}>
              <Row label="Subtotal" value={`$${cartTotal.toFixed(2)}`} />
              <div style={{ borderTop: `1px solid ${B.yellow}`, margin: "8px 0" }} />
              <Row label="Total" value={`$${cartTotal.toFixed(2)}`} big />
            </Card>
          </div>
          <div className="px-5 py-3" style={{ background: "white", borderTop: `1px solid ${B.line}` }}>
            <PillButton onClick={onCheckout} primary>Checkout • ${cartTotal.toFixed(2)}</PillButton>
          </div>
        </>
      )}
    </div>
  );
}

/* ============================================================
   CHECKOUT
============================================================ */
function Checkout({ cart, cartTotal, onBack, onPay }) {
  const [promoInput, setPromoInput] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState(false);
  const discount = promoApplied ? cartTotal * 0.1 : 0;
  const total = cartTotal - discount;

  const applyPromo = () => {
    if (promoInput.trim().toUpperCase() === "WELCOME10") {
      setPromoApplied(true); setPromoError(false);
    } else { setPromoError(true); }
  };

  return (
    <div className="flex flex-col h-full">
      <BackHeader title="Checkout" onBack={onBack} />
      <div className="flex-1 overflow-y-auto kalimi-scroll px-5 py-3">
        <div className="text-[10px] uppercase tracking-wider font-bold mb-2" style={{ color: B.sub }}>
          Order ({cart.length})
        </div>
        <Card noPad className="mb-3">
          {cart.map((item, i) => (
            <div key={item.key} className="flex items-center gap-3 p-3"
              style={{ borderBottom: i < cart.length - 1 ? `1px solid ${B.lineSoft}` : "none" }}>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg"
                style={{ background: B.yellowSoft }}>{item.flag}</div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold truncate" style={{ color: B.ink }}>
                  {item.countryName} • {item.data}
                </div>
                <div className="text-[10px]" style={{ color: B.sub }}>{item.duration} × {item.qty}</div>
              </div>
              <div className="text-xs font-bold" style={{ color: B.ink }}>
                ${(parseFloat(item.price.replace("$", "")) * item.qty).toFixed(2)}
              </div>
            </div>
          ))}
        </Card>

        <div className="text-[10px] uppercase tracking-wider font-bold mb-2" style={{ color: B.sub }}>Promo code</div>
        <Card className="mb-3">
          {promoApplied ? (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: B.successSoft }}>
                <Check size={14} color={B.success} strokeWidth={3} />
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold" style={{ color: B.ink }}>WELCOME10</div>
                <div className="text-[10px]" style={{ color: B.success }}>10% off applied</div>
              </div>
              <button onClick={() => { setPromoApplied(false); setPromoInput(""); }}>
                <X size={15} color={B.sub} />
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3">
                <Tag size={16} color={B.ink} />
                <input value={promoInput}
                  onChange={(e) => { setPromoInput(e.target.value); setPromoError(false); }}
                  placeholder="Enter code"
                  className="flex-1 text-sm outline-none bg-transparent" style={{ color: B.ink }} />
                <button onClick={applyPromo} disabled={!promoInput}
                  className="text-xs font-bold px-3 py-1.5 rounded-full"
                  style={{
                    background: promoInput ? B.ink : B.lineSoft,
                    color: promoInput ? "white" : B.sub,
                  }}>Apply</button>
              </div>
              {promoError && (
                <div className="text-[10px] mt-2 font-semibold" style={{ color: B.danger }}>
                  Invalid or expired promo code
                </div>
              )}
            </>
          )}
        </Card>

        <div className="text-[10px] uppercase tracking-wider font-bold mb-2" style={{ color: B.sub }}>Payment method</div>
        <Card className="mb-3">
          <PayRow label="Apple Pay" selected />
          <PayRow label="Visa ending 4242" />
          <PayRow label="Add new card" add last />
        </Card>

        <Card style={{ background: B.yellowSoft, borderColor: B.yellow }}>
          <Row label="Subtotal" value={`$${cartTotal.toFixed(2)}`} />
          {promoApplied && <Row label="Discount (WELCOME10)" value={`-$${discount.toFixed(2)}`} green />}
          <div style={{ borderTop: `1px solid ${B.yellow}`, margin: "8px 0" }} />
          <Row label="Total" value={`$${total.toFixed(2)}`} big />
        </Card>
      </div>
      <div className="px-5 py-3" style={{ background: "white", borderTop: `1px solid ${B.line}` }}>
        <PillButton onClick={onPay} primary>Pay ${total.toFixed(2)}</PillButton>
        <p className="text-[10px] text-center mt-2" style={{ color: B.sub }}>
          By paying you agree to the Terms of Service
        </p>
      </div>
    </div>
  );
}

function PayRow({ label, selected, add, last }) {
  const I = add ? Plus : CreditCard;
  return (
    <div className="flex items-center gap-3 py-2.5"
      style={{ borderBottom: last ? "none" : `1px solid ${B.lineSoft}` }}>
      <I size={16} color={B.ink} />
      <span className="text-sm flex-1" style={{ color: B.ink }}>{label}</span>
      {selected && (
        <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: B.yellow }}>
          <Check size={12} color={B.ink} strokeWidth={3} />
        </div>
      )}
    </div>
  );
}

function Row({ label, value, big, green }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-xs" style={{ color: big ? B.ink : B.sub, fontWeight: big ? 700 : 400 }}>{label}</span>
      <span className={big ? "text-base font-bold" : "text-xs font-semibold"}
        style={{ color: green ? B.success : B.ink }}>{value}</span>
    </div>
  );
}

/* ============================================================
   PAYING
============================================================ */
function PayingScreen({ onDone }) {
  const [stage, setStage] = useState("processing");
  useEffect(() => {
    if (stage === "processing") {
      const t = setTimeout(() => setStage("done"), 1600);
      return () => clearTimeout(t);
    }
  }, [stage]);
  return (
    <div className="flex flex-col items-center justify-center h-full px-8 text-center" style={{ background: B.bg }}>
      {stage === "processing" ? (
        <>
          <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6" style={{ background: B.yellowSoft }}>
            <div className="kalimi-spin w-10 h-10 rounded-full"
              style={{ borderWidth: 3, borderStyle: "solid", borderColor: `${B.yellow} ${B.yellow} transparent ${B.yellow}` }} />
          </div>
          <Headline size={22}>Processing payment…</Headline>
          <p className="text-sm mt-3" style={{ color: B.sub }}>Hang tight, won't be a sec.</p>
        </>
      ) : (
        <>
          <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6" style={{ background: B.yellow }}>
            <CheckCircle2 size={40} color={B.ink} strokeWidth={2} />
          </div>
          <Headline size={22}>Payment successful</Headline>
          <p className="text-sm mt-3 mb-6" style={{ color: B.sub }}>
            Your eSIM is ready. We've also emailed your QR code.
          </p>
          <div className="w-full max-w-xs">
            <PillButton onClick={onDone} primary Icon={QrCode}>Install eSIM now</PillButton>
          </div>
        </>
      )}
    </div>
  );
}

/* ============================================================
   INSTALL FLOW
============================================================ */
function InstallFlow({ sim, onDone, onBack }) {
  const [stage, setStage] = useState("qr");
  useEffect(() => {
    if (stage === "waiting") {
      const t = setTimeout(() => setStage("done"), 2500);
      return () => clearTimeout(t);
    }
  }, [stage]);
  if (!sim) return null;

  return (
    <div className="flex flex-col h-full">
      <BackHeader title="Install eSIM" onBack={onBack} />
      {stage === "qr" && (
        <>
          <div className="flex-1 overflow-y-auto kalimi-scroll px-5 pb-4 flex flex-col items-center text-center">
            <div className="flex items-center gap-2 mb-4 mt-2">
              <span className="text-2xl">{sim.flag}</span>
              <span className="text-sm font-bold" style={{ color: B.ink }}>{sim.country} • {sim.data}</span>
            </div>
            <div className="w-52 h-52 p-3 rounded-3xl mb-4" style={{ background: "white", border: `3px solid ${B.yellow}` }}>
              <FauxQr />
            </div>
            <Card className="w-full mb-3" style={{ background: B.yellowSoft, borderColor: B.yellow }}>
              <div className="text-left">
                <div className="text-[10px] uppercase tracking-wider font-bold mb-1" style={{ color: B.sub }}>Quick install</div>
                <div className="text-xs font-semibold leading-relaxed" style={{ color: B.ink }}>
                  Settings → Cellular → Add Plan → Scan this QR
                </div>
              </div>
            </Card>
            <div className="grid grid-cols-2 gap-2 w-full mb-3">
              <PillButton Icon={Copy}>Copy code</PillButton>
              <PillButton Icon={Download}>Save QR</PillButton>
            </div>
          </div>
          <div className="px-5 py-3" style={{ background: "white", borderTop: `1px solid ${B.line}` }}>
            <PillButton onClick={() => setStage("waiting")} primary>I've scanned the QR</PillButton>
          </div>
        </>
      )}
      {stage === "waiting" && (
        <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6" style={{ background: B.yellowSoft }}>
            <div className="kalimi-spin w-10 h-10 rounded-full"
              style={{ borderWidth: 3, borderStyle: "solid", borderColor: `${B.yellow} ${B.yellow} transparent ${B.yellow}` }} />
          </div>
          <Headline size={22}>Activating your eSIM…</Headline>
          <p className="text-sm mt-3" style={{ color: B.sub }}>Finishing setup. This usually takes a few seconds.</p>
        </div>
      )}
      {stage === "done" && (
        <div className="flex-1 flex flex-col">
          <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6" style={{ background: B.successSoft }}>
              <CheckCircle2 size={40} color={B.success} />
            </div>
            <Headline size={22}>Your eSIM is active</Headline>
            <p className="text-sm mt-3" style={{ color: B.sub }}>
              {sim.country} • {sim.data} • {sim.days} days
            </p>
            <Card className="w-full mt-5 text-left">
              <div className="text-[10px] uppercase tracking-wider font-bold mb-2" style={{ color: B.sub }}>Before you travel</div>
              <Bullet text="Enable Data Roaming on the Kalimi line" />
              <Bullet text="Set Kalimi as secondary line (keep your primary for calls)" />
              <Bullet text="Your plan activates when you connect at your destination" last />
            </Card>
          </div>
          <div className="px-5 py-3" style={{ background: "white", borderTop: `1px solid ${B.line}` }}>
            <PillButton onClick={onDone} primary>Done</PillButton>
          </div>
        </div>
      )}
    </div>
  );
}

function Bullet({ text, last }) {
  return (
    <div className="flex gap-2 py-1.5" style={{ borderBottom: last ? "none" : `1px solid ${B.lineSoft}` }}>
      <CheckCircle2 size={15} color={B.ink} style={{ flexShrink: 0, marginTop: 1 }} />
      <span className="text-xs" style={{ color: B.ink2 }}>{text}</span>
    </div>
  );
}

function FauxQr() {
  const cells = Array.from({ length: 100 }, (_, i) => ((i * 7 + i * i) % 3 === 0 ? 1 : 0));
  [0, 1, 2, 10, 12, 20, 21, 22].forEach((idx) => (cells[idx] = 1));
  [7, 8, 9, 17, 19, 27, 28, 29].forEach((idx) => (cells[idx] = 1));
  [70, 71, 72, 80, 82, 90, 91, 92].forEach((idx) => (cells[idx] = 1));
  return (
    <div className="grid w-full h-full" style={{ gridTemplateColumns: "repeat(10, 1fr)", gap: 1 }}>
      {cells.map((v, i) => (
        <div key={i} style={{ background: v ? B.ink : "transparent", borderRadius: 1 }} />
      ))}
    </div>
  );
}

/* ============================================================
   MULTI-DESTINATION
============================================================ */
function MultiDestination({ onBack, onResults, onRegional }) {
  const [stops, setStops] = useState([
    { id: 1, country: null, days: 7 },
    { id: 2, country: null, days: 7 },
  ]);

  const addStop = () => {
    if (stops.length >= 5) return;
    setStops((s) => [...s, { id: Date.now(), country: null, days: 7 }]);
  };
  const removeStop = (id) => setStops((s) => s.filter((x) => x.id !== id));
  const updateStop = (id, patch) => setStops((s) => s.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  const canFind = stops.filter((s) => s.country).length >= 2;

  return (
    <div className="flex flex-col h-full">
      <BackHeader title="Multi-destination trip" onBack={onBack} />
      <div className="flex-1 overflow-y-auto kalimi-scroll px-5 pb-6">
        <h2 className="text-base font-bold mb-1" style={{ color: B.ink }}>Travelling to multiple destinations?</h2>
        <p className="text-xs mb-4 leading-relaxed" style={{ color: B.sub }}>
          Tell us where you're going and how long you'll stay, and we'll show you the most suitable plans.
        </p>

        <Card noPad className="mb-3">
          {stops.map((stop, idx) => (
            <StopRow key={stop.id} stop={stop} idx={idx}
              onChange={(patch) => updateStop(stop.id, patch)}
              onRemove={stops.length > 1 ? () => removeStop(stop.id) : null}
              last={idx === stops.length - 1} />
          ))}
          <button onClick={addStop}
            className="flex items-center gap-2 p-4 w-full text-sm font-semibold" style={{ color: B.ink }}>
            <Plus size={16} /> Add destination
          </button>
        </Card>

        <PillButton onClick={() => onResults(stops.filter((s) => s.country))} primary disabled={!canFind}>
          Find plans
        </PillButton>

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px" style={{ background: B.line }} />
          <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: B.sub }}>or</span>
          <div className="flex-1 h-px" style={{ background: B.line }} />
        </div>

        <h3 className="text-sm font-bold mb-2" style={{ color: B.ink }}>Use an existing regional plan</h3>
        <div className="flex flex-col gap-2">
          {REGIONAL_PLANS.map((r) => {
            const I = r.icon;
            return (
              <button key={r.id} onClick={onRegional}
                className="flex items-center gap-3 p-4 rounded-2xl text-left"
                style={{ background: "white", border: `1px solid ${B.line}` }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: B.lineSoft }}>
                  <I size={18} color={B.ink} />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold" style={{ color: B.ink }}>{r.name}</div>
                  <div className="text-xs" style={{ color: B.sub }}>From {r.from}</div>
                </div>
                <ChevronRight size={16} color={B.sub} />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function StopRow({ stop, idx, onChange, onRemove, last }) {
  const [openList, setOpenList] = useState(false);
  return (
    <div className="p-3" style={{ borderBottom: last ? "none" : `1px solid ${B.lineSoft}` }}>
      <div className="flex items-center gap-2">
        <button onClick={() => setOpenList(!openList)}
          className="flex-1 flex items-center gap-2 px-3 py-2 rounded-full"
          style={{ background: B.lineSoft }}>
          {stop.country ? (
            <>
              <span className="text-base">{stop.country.flag}</span>
              <span className="text-xs font-semibold" style={{ color: B.ink }}>{stop.country.name}</span>
            </>
          ) : (
            <>
              <Search size={13} color={B.sub} />
              <span className="text-xs" style={{ color: B.sub }}>Where are you going?</span>
            </>
          )}
          {stop.country && (
            <button onClick={(e) => { e.stopPropagation(); onChange({ country: null }); }} className="ml-auto">
              <X size={13} color={B.sub} />
            </button>
          )}
        </button>
        <div className="flex items-center gap-1 px-2 py-2 rounded-full" style={{ background: B.lineSoft }}>
          <input type="number" min="1" max="90" value={stop.days}
            onChange={(e) => onChange({ days: parseInt(e.target.value) || 1 })}
            className="w-7 text-xs font-bold bg-transparent outline-none text-right" style={{ color: B.ink }} />
          <span className="text-[10px] font-semibold" style={{ color: B.sub }}>days</span>
        </div>
        {onRemove && (
          <button onClick={onRemove} className="w-8 h-8 rounded-full flex items-center justify-center">
            <Trash2 size={14} color={B.sub} />
          </button>
        )}
      </div>
      {openList && (
        <div className="mt-2 max-h-40 overflow-y-auto kalimi-scroll flex flex-col gap-1">
          {COUNTRIES.map((c) => (
            <button key={c.code}
              onClick={() => { onChange({ country: c }); setOpenList(false); }}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 text-left">
              <span className="text-base">{c.flag}</span>
              <span className="text-xs font-semibold" style={{ color: B.ink }}>{c.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function MultiResults({ trip, onBack, onAdd }) {
  if (!trip) return null;
  const totalDays = trip.reduce((a, b) => a + b.days, 0);
  const bestMatch = { name: "Global eSIM — Unlimited", covers: trip.map((t) => t.country.name), days: totalDays, price: "$94.99", id: "best" };
  const alts = [
    { name: "Global eSIM — Unlimited", covers: trip.map((t) => t.country.name), days: totalDays + 3, price: "$134.99", id: "a1" },
    { name: "Global eSIM — Unlimited", covers: trip.map((t) => t.country.name), days: totalDays + 8, price: "$199.99", id: "a2" },
  ];

  return (
    <div className="flex flex-col h-full">
      <BackHeader title="Best plans for your trip" onBack={onBack} />
      <div className="flex-1 overflow-y-auto kalimi-scroll px-5 pb-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {trip.map((t) => (
            <span key={t.country.code}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{ background: "white", border: `1px solid ${B.line}`, color: B.ink }}>
              <span className="text-base">{t.country.flag}</span> {t.country.name} • {t.days}d
            </span>
          ))}
        </div>

        <div className="rounded-2xl p-4 mb-4 relative"
          style={{ background: B.yellowSoft, border: `2px solid ${B.yellow}` }}>
          <span className="absolute top-3 left-3 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide"
            style={{ background: B.yellow, color: B.ink }}>Best match</span>
          <div className="mt-6">
            <div className="text-sm font-bold" style={{ color: B.ink }}>{bestMatch.name}</div>
            <div className="text-xs mt-0.5" style={{ color: B.sub }}>
              Covers {bestMatch.covers.join(", ")} — {bestMatch.days} days
            </div>
            <div className="flex items-center justify-between mt-3">
              <span className="text-xl font-bold" style={{ color: B.ink }}>{bestMatch.price}</span>
              <div className="flex gap-2">
                <button className="px-3 py-2 rounded-full text-xs font-bold"
                  style={{ background: "white", color: B.ink, border: `1px solid ${B.line}` }}>View plan</button>
                <button onClick={() => onAdd({
                  key: `multi-${bestMatch.id}-${Date.now()}`,
                  countryName: "Global", flag: "🌍", data: "Unlimited",
                  duration: `${bestMatch.days} days`, days: bestMatch.days, price: bestMatch.price,
                })}
                  className="px-3 py-2 rounded-full text-xs font-bold"
                  style={{ background: B.ink, color: "white" }}>Add to cart</button>
              </div>
            </div>
          </div>
        </div>

        <div className="text-xs font-semibold mb-2" style={{ color: B.sub }}>Alternative tiers (same coverage)</div>
        <div className="flex flex-col gap-2">
          {alts.map((a) => (
            <Card key={a.id}>
              <div className="text-sm font-bold" style={{ color: B.ink }}>{a.name}</div>
              <div className="text-xs mt-0.5" style={{ color: B.sub }}>
                Covers {a.covers.join(", ")} — {a.days} days
              </div>
              <div className="flex items-center justify-between mt-3">
                <span className="text-base font-bold" style={{ color: B.ink }}>{a.price}</span>
                <div className="flex gap-2">
                  <button className="px-3 py-2 rounded-full text-xs font-bold"
                    style={{ background: "white", color: B.ink, border: `1px solid ${B.line}` }}>View</button>
                  <button onClick={() => onAdd({
                    key: `multi-${a.id}-${Date.now()}`,
                    countryName: "Global", flag: "🌍", data: "Unlimited",
                    duration: `${a.days} days`, days: a.days, price: a.price,
                  })}
                    className="px-3 py-2 rounded-full text-xs font-bold"
                    style={{ background: B.yellow, color: B.ink }}>Add</button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

function RegionalList({ onBack, onRegion }) {
  return (
    <div>
      <BackHeader title="Regional plans" onBack={onBack} />
      <div className="px-5 pb-6 flex flex-col gap-2">
        {REGIONAL_PLANS.map((r) => {
          const I = r.icon;
          return (
            <button key={r.id} onClick={() => onRegion(r)}
              className="flex items-center gap-3 p-4 rounded-2xl text-left"
              style={{ background: "white", border: `1px solid ${B.line}` }}>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: B.yellowSoft }}>
                <I size={20} color={B.ink} />
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold" style={{ color: B.ink }}>{r.name}</div>
                <div className="text-xs" style={{ color: B.sub }}>
                  Covers {r.covers.length} countries • from {r.from}
                </div>
              </div>
              <ChevronRight size={16} color={B.sub} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

function RegionDetail({ region, onBack, onAdd }) {
  const I = region.icon;
  const plans = [
    { id: "r1", data: "5 GB",      days: 15, price: "$12.99" },
    { id: "r2", data: "10 GB",     days: 30, price: "$24.99" },
    { id: "r3", data: "20 GB",     days: 30, price: "$39.99" },
    { id: "r4", data: "Unlimited", days: 7,  price: "$29.99" },
  ];
  const [sel, setSel] = useState(null);
  const selPlan = plans.find((p) => p.id === sel);
  return (
    <div className="flex flex-col h-full">
      <BackHeader title={region.name} onBack={onBack} />
      <div className="flex-1 overflow-y-auto kalimi-scroll px-5 pb-4">
        <Card className="mb-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: B.yellowSoft }}>
              <I size={20} color={B.ink} />
            </div>
            <div>
              <div className="text-sm font-bold" style={{ color: B.ink }}>{region.name}</div>
              <div className="text-xs" style={{ color: B.sub }}>Valid across {region.covers.length} countries</div>
            </div>
          </div>
          <div className="flex flex-wrap gap-1">
            {region.covers.map((c) => (
              <span key={c} className="text-[10px] px-2 py-1 rounded-full"
                style={{ background: B.lineSoft, color: B.ink2 }}>{c}</span>
            ))}
          </div>
        </Card>

        <h3 className="text-sm font-bold mb-2" style={{ color: B.ink }}>Choose a plan</h3>
        <div className="flex flex-col gap-2">
          {plans.map((p) => {
            const isSel = sel === p.id;
            return (
              <button key={p.id} onClick={() => setSel(p.id)}
                className="flex items-center justify-between p-4 rounded-2xl text-left"
                style={{
                  background: isSel ? B.yellowSoft : "white",
                  border: `2px solid ${isSel ? B.yellow : B.line}`,
                }}>
                <div>
                  <div className="text-lg font-bold" style={{ color: B.ink }}>{p.data}</div>
                  <div className="text-xs" style={{ color: B.sub }}>{p.days} days</div>
                </div>
                <span className="text-base font-bold" style={{ color: B.ink }}>{p.price}</span>
              </button>
            );
          })}
        </div>
      </div>
      {selPlan && (
        <div className="px-5 py-3" style={{ background: "white", borderTop: `1px solid ${B.line}` }}>
          <PillButton onClick={() => onAdd({
            key: `reg-${region.id}-${selPlan.id}-${Date.now()}`,
            countryName: region.name, flag: region.id === "eu" ? "🇪🇺" : "🌍",
            data: selPlan.data, duration: `${selPlan.days} days`,
            days: selPlan.days, price: selPlan.price,
          })} primary>
            Add to cart • {selPlan.price}
          </PillButton>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   MY ESIMS
============================================================ */
function MyEsims({ hasEsims, esims, onShop, onHow, onSim }) {
  if (!hasEsims || esims.length === 0) return <EmptyEsims onShop={onShop} onHow={onHow} />;
  return (
    <div className="px-5 pt-2 pb-6">
      <div className="flex items-center justify-between mb-4">
        <Headline size={24}>My eSIMs</Headline>
        <button onClick={onShop}
          className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: B.yellow }}>
          <Plus size={18} color={B.ink} strokeWidth={2.5} />
        </button>
      </div>
      <div className="flex flex-col gap-3">
        {esims.map((sim) => <EsimCard key={sim.id} sim={sim} onClick={() => onSim(sim)} />)}
      </div>
    </div>
  );
}

function EsimCard({ sim, onClick }) {
  const pct = sim.total > 0 ? (sim.used / sim.total) * 100 : 0;
  const isActive = sim.status === "active" || sim.status === "active_low";
  const low = sim.status === "active_low";
  return (
    <div onClick={onClick} className="rounded-2xl p-4 cursor-pointer"
      style={{ background: "white", border: `1px solid ${B.line}` }}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl"
            style={{ background: B.yellowSoft }}>{sim.flag}</div>
          <div>
            <div className="text-sm font-bold" style={{ color: B.ink }}>{sim.country}</div>
            <div className="text-xs" style={{ color: B.sub }}>{sim.data} • {sim.days} days</div>
          </div>
        </div>
        <StatusBadge status={sim.status} />
      </div>

      {isActive ? (
        <>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs" style={{ color: B.sub }}>
              <span style={{ color: B.ink, fontWeight: 700 }}>{sim.used} GB</span> of {sim.total} GB used
            </span>
            <span className="text-xs" style={{ color: low ? B.danger : B.sub, fontWeight: low ? 600 : 400 }}>
              {sim.daysLeft} days left
            </span>
          </div>
          <div className="h-2 w-full rounded-full overflow-hidden" style={{ background: B.lineSoft }}>
            <div className="h-full rounded-full transition-all"
              style={{ width: `${pct}%`, background: low ? B.danger : B.ink }} />
          </div>
          {low && (
            <div className="mt-3 flex items-center gap-2 text-xs font-semibold" style={{ color: B.danger }}>
              <AlertTriangle size={13} />
              Almost out of data — top up to stay connected
            </div>
          )}
        </>
      ) : (
        <button onClick={(e) => { e.stopPropagation(); onClick(); }}
          className="w-full py-3 rounded-full text-xs font-bold flex items-center justify-center gap-2"
          style={{ background: B.yellow, color: B.ink }}>
          <QrCode size={14} />
          Install eSIM
        </button>
      )}
    </div>
  );
}

function StatusBadge({ status }) {
  const map = {
    active:        { label: "Active",        bg: B.successSoft, fg: B.success },
    active_low:    { label: "Low data",      bg: B.dangerSoft,  fg: B.danger },
    not_installed: { label: "Not installed", bg: B.dangerSoft,  fg: B.danger },
  };
  const s = map[status];
  return (
    <span className="text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide"
      style={{ background: s.bg, color: s.fg }}>{s.label}</span>
  );
}

function EmptyEsims({ onShop, onHow }) {
  return (
    <div className="px-5 pt-2 pb-6 flex flex-col h-full">
      <Headline size={24}>My eSIMs</Headline>
      <div className="flex-1 flex flex-col items-center justify-center text-center px-2">
        <div className="w-24 h-24 rounded-full flex items-center justify-center mb-5" style={{ background: B.yellow }}>
          <Smartphone size={40} color={B.ink} strokeWidth={1.8} />
        </div>
        <h3 className="text-lg font-bold mb-2" style={{ color: B.ink, letterSpacing: "-0.02em" }}>
          You don't have any eSIMs yet
        </h3>
        <p className="text-sm leading-relaxed mb-6" style={{ color: B.sub }}>
          Pick a destination and get connected in under 2 minutes.
        </p>
        <div className="flex flex-col gap-2 w-full">
          <PillButton onClick={onShop} primary>Shop eSIMs now</PillButton>
          <PillButton onClick={onHow}>How kalimi works</PillButton>
        </div>
        <div className="w-full rounded-2xl p-4 mt-5 flex items-center gap-3 text-left" style={{ background: B.ink, color: "white" }}>
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: B.yellow }}>
            <Sparkles size={16} color={B.ink} />
          </div>
          <div className="flex-1">
            <div className="text-sm font-bold">Welcome: 10% off</div>
            <div className="text-xs opacity-70">
              Use code <span style={{ color: B.yellow, fontWeight: 700 }}>WELCOME10</span> at checkout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   ESIM DETAIL
============================================================ */
function EsimDetail({ sim, onBack, onTopUp, onInstall, onGuide }) {
  if (!sim) return null;
  const pct = sim.total > 0 ? (sim.used / sim.total) * 100 : 0;
  const isActive = sim.status === "active" || sim.status === "active_low";
  const low = sim.status === "active_low";

  return (
    <div>
      <BackHeader title="eSIM details" onBack={onBack} />
      <div className="px-5 pb-6">
        <Card noPad className="overflow-hidden mb-4">
          <div className="p-4" style={{ background: B.yellowSoft }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-3xl" style={{ background: "white" }}>
                {sim.flag}
              </div>
              <div className="flex-1">
                <div className="text-xs uppercase tracking-wider font-semibold" style={{ color: B.sub }}>{sim.country}</div>
                <div className="text-lg font-bold" style={{ color: B.ink }}>{sim.data} • {sim.days} days</div>
              </div>
              <StatusBadge status={sim.status} />
            </div>
            {isActive && (
              <>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs" style={{ color: B.sub }}>
                    <span style={{ color: B.ink, fontWeight: 700 }}>{sim.used} GB</span> of {sim.total} GB used
                  </span>
                  <span className="text-xs font-semibold" style={{ color: low ? B.danger : B.sub }}>
                    {sim.daysLeft} days left
                  </span>
                </div>
                <div className="h-2 w-full rounded-full overflow-hidden" style={{ background: "white" }}>
                  <div className="h-full rounded-full" style={{ width: `${pct}%`, background: low ? B.danger : B.ink }} />
                </div>
              </>
            )}
          </div>
          <div className="grid grid-cols-2">
            <button onClick={onInstall} className="flex flex-col items-center py-4 gap-1" style={{ borderRight: `1px solid ${B.line}` }}>
              <QrCode size={18} color={B.ink} />
              <span className="text-xs font-bold" style={{ color: B.ink }}>Install</span>
            </button>
            <button onClick={onTopUp} className="flex flex-col items-center py-4 gap-1">
              <Plus size={18} color={B.ink} />
              <span className="text-xs font-bold" style={{ color: B.ink }}>Top up</span>
            </button>
          </div>
        </Card>

        <Card className="mb-3">
          <h4 className="text-[10px] uppercase tracking-wider font-bold mb-3" style={{ color: B.sub }}>Plan info</h4>
          <PlanDetailRow Icon={Wifi}  label="Data"     value={sim.data} />
          <PlanDetailRow Icon={Clock} label="Validity" value={`${sim.days} days`} />
          <PlanDetailRow Icon={Radio} label="Network"  value="4G / 5G" />
          <PlanDetailRow Icon={Copy}  label="ICCID"    value={sim.iccid.slice(-9)} last />
        </Card>

        <Card>
          <h4 className="text-[10px] uppercase tracking-wider font-bold mb-3" style={{ color: B.sub }}>Need help?</h4>
          <button onClick={onGuide} className="flex items-center gap-3 py-2 w-full">
            <FileText size={15} color={B.ink} />
            <span className="text-xs flex-1 text-left" style={{ color: B.ink }}>Installation guide</span>
            <ChevronRight size={14} color={B.sub} />
          </button>
          <button className="flex items-center gap-3 py-2 w-full">
            <MessageCircle size={15} color={B.ink} />
            <span className="text-xs flex-1 text-left" style={{ color: B.ink }}>Chat with support</span>
            <ChevronRight size={14} color={B.sub} />
          </button>
        </Card>
      </div>
    </div>
  );
}

/* ============================================================
   HOW IT WORKS
============================================================ */
function HowItWorks({ onBack }) {
  const steps = [
    { Icon: ShoppingCart, title: "Choose your plan",    body: "Choose the data plan and validity that suits you. No documents, no contract." },
    { Icon: QrCode,       title: "Install via QR",      body: "Scan the QR code, follow the steps and have your eSIM set up in under 2 minutes." },
    { Icon: Plane,        title: "Activate your eSIM",  body: "Set up from home so you're online the moment you step off the plane." },
  ];
  return (
    <div>
      <BackHeader title="" onBack={onBack} />
      <div className="px-5 pb-6">
        <div className="mb-6"><Headline size={26} underline="eSIM setup">in 3 easy steps</Headline></div>
        <div className="flex flex-col gap-3">
          {steps.map((s, i) => {
            const I = s.Icon;
            return (
              <Card key={i}>
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: B.yellow }}>
                    <I size={22} color={B.ink} />
                  </div>
                  <div>
                    <div className="text-sm font-bold" style={{ color: B.ink }}>{s.title}</div>
                    <div className="text-xs mt-1 leading-relaxed" style={{ color: B.sub }}>{s.body}</div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   HELP
============================================================ */
function HelpHome({ onFaq, onChat, onCompat, onInstall }) {
  const items = [
    { Icon: MessageCircle, label: "Chat with support",           sub: "Usually replies in a few minutes", onClick: onChat },
    { Icon: FileText,      label: "FAQs",                        sub: "Common questions answered",        onClick: onFaq },
    { Icon: QrCode,        label: "Installation guide",          sub: "Step-by-step for your device",     onClick: onInstall },
    { Icon: Smartphone,    label: "Check device compatibility",  sub: "Verify your phone supports eSIM",  onClick: onCompat },
  ];
  return (
    <div className="px-5 pt-2 pb-6">
      <Headline size={24}>Help</Headline>
      <p className="text-sm mt-2 mb-5" style={{ color: B.sub }}>
        We've got you covered. Any questions — we're 24/7.
      </p>
      <div className="flex flex-col gap-2">
        {items.map((i) => {
          const I = i.Icon;
          return (
            <button key={i.label} onClick={i.onClick}
              className="flex items-center gap-3 p-4 rounded-2xl text-left"
              style={{ background: "white", border: `1px solid ${B.line}` }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: B.yellow }}>
                <I size={18} color={B.ink} />
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold" style={{ color: B.ink }}>{i.label}</div>
                <div className="text-xs" style={{ color: B.sub }}>{i.sub}</div>
              </div>
              <ChevronRight size={16} color={B.sub} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

function FaqList({ onBack, onItem }) {
  return (
    <div>
      <BackHeader title="FAQs" onBack={onBack} />
      <div className="px-5 pb-6 flex flex-col gap-2">
        {FAQS.map((f, i) => (
          <button key={i} onClick={() => onItem(f)}
            className="flex items-center justify-between p-4 rounded-2xl text-left"
            style={{ background: "white", border: `1px solid ${B.line}` }}>
            <span className="text-sm font-semibold pr-3" style={{ color: B.ink }}>{f.q}</span>
            <ChevronRight size={16} color={B.sub} />
          </button>
        ))}
      </div>
    </div>
  );
}

function FaqArticle({ faq, onBack, onChat }) {
  return (
    <div>
      <BackHeader title="FAQ" onBack={onBack} />
      <div className="px-5 pb-6">
        <Headline size={22}>{faq.q}</Headline>
        <p className="text-sm mt-4 leading-relaxed" style={{ color: B.ink2 }}>{faq.a}</p>
        <div className="mt-8 p-4 rounded-2xl flex items-center gap-3" style={{ background: B.yellowSoft }}>
          <span className="text-xs flex-1" style={{ color: B.ink }}>Still stuck? We're here to help.</span>
          <button onClick={onChat} className="px-3 py-2 rounded-full text-xs font-bold"
            style={{ background: B.ink, color: "white" }}>Chat with us</button>
        </div>
      </div>
    </div>
  );
}

function ChatScreen({ onBack }) {
  const [messages, setMessages] = useState([
    { side: "them", text: "Hi! I'm Alex from Kalimi support. How can I help today?" },
    { side: "me",   text: "I'm about to travel to Japan — which plan do you recommend for 2 weeks?" },
    { side: "them", text: "For 2 weeks in Japan, most travellers go with our 5 GB / 30 days plan. Want me to send the link?" },
  ]);
  const [input, setInput] = useState("");
  const send = () => {
    if (!input.trim()) return;
    setMessages((m) => [...m, { side: "me", text: input }]);
    setInput("");
    setTimeout(() => setMessages((m) => [...m, { side: "them", text: "Got it — one sec, I'll check that for you." }]), 800);
  };
  return (
    <div className="flex flex-col h-full">
      <BackHeader title="Support" onBack={onBack}
        right={<span className="flex items-center gap-1.5 text-[10px] font-semibold" style={{ color: B.success }}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: B.success }} />
          Online
        </span>} />
      <div className="flex-1 overflow-y-auto kalimi-scroll px-5 py-3 flex flex-col gap-2">
        {messages.map((m, i) => <Bubble key={i} side={m.side}>{m.text}</Bubble>)}
      </div>
      <div className="px-4 py-3 flex items-center gap-2" style={{ borderTop: `1px solid ${B.line}`, background: "white" }}>
        <input value={input} onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Type a message"
          className="flex-1 text-sm outline-none bg-transparent rounded-full px-4 py-2"
          style={{ background: B.lineSoft, color: B.ink }} />
        <button onClick={send}
          className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: B.yellow }}>
          <ChevronRight size={18} color={B.ink} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
}

function Bubble({ side, children }) {
  const me = side === "me";
  return (
    <div className={`flex ${me ? "justify-end" : "justify-start"}`}>
      <div className="max-w-[75%] px-3 py-2 text-xs leading-relaxed"
        style={{
          background: me ? B.yellow : B.lineSoft,
          color: B.ink,
          borderRadius: 16,
          borderBottomRightRadius: me ? 4 : 16,
          borderBottomLeftRadius: me ? 16 : 4,
        }}>
        {children}
      </div>
    </div>
  );
}

/* ============================================================
   COMPAT CHECK
============================================================ */
function CompatCheck({ onBack, setDeviceSupported, onSuccess }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const filtered = DEVICES.filter((d) => {
    const matchQ = !q || d.name.toLowerCase().includes(q.toLowerCase()) || d.brand.toLowerCase().includes(q.toLowerCase());
    if (!matchQ) return false;
    if (cat === "All") return true;
    if (cat === "Apple" || cat === "Samsung" || cat === "Pixel") {
      return d.brand.toLowerCase().includes(cat.toLowerCase()) || (cat === "Pixel" && d.brand === "Google");
    }
    return d.category === cat;
  });

  return (
    <div>
      <BackHeader title="" onBack={onBack} />
      <div className="px-5 pb-6">
        <Headline size={22}>Is your device eSIM ready?</Headline>
        <p className="text-sm mt-2 mb-4" style={{ color: B.sub }}>
          Search your device or tap the one that matches yours.
        </p>

        <div className="rounded-2xl p-3 mb-4 flex items-start gap-2" style={{ background: B.infoSoft }}>
          <Monitor size={16} color={B.info} style={{ marginTop: 2 }} />
          <div>
            <div className="text-xs font-bold" style={{ color: B.info }}>
              We can't auto-detect from a desktop browser
            </div>
            <div className="text-[11px] leading-relaxed" style={{ color: B.info }}>
              Open this page on your phone for instant detection, or search below.
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4"
          style={{ background: "white", border: `1px solid ${B.line}`, borderRadius: 999, padding: "10px 16px" }}>
          <Search size={16} color={B.sub} />
          <input value={q} onChange={(e) => setQ(e.target.value)}
            placeholder="Search your phone model"
            className="flex-1 text-sm outline-none bg-transparent" />
          {q && <button onClick={() => setQ("")}><X size={14} color={B.sub} /></button>}
        </div>

        <div className="flex gap-2 mb-4 overflow-x-auto pb-1 -mx-5 px-5">
          {DEVICE_CATS.map((c) => (
            <button key={c} onClick={() => setCat(c)}
              className="px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap"
              style={{
                background: cat === c ? B.yellow : "white",
                color: B.ink,
                border: `1px solid ${cat === c ? B.yellow : B.line}`,
              }}>
              {c}
            </button>
          ))}
        </div>

        <div className="text-[10px] uppercase tracking-wider font-bold mb-2" style={{ color: B.sub }}>
          {filtered.length} devices
        </div>

        <div className="grid grid-cols-2 gap-2">
          {filtered.map((d, i) => (
            <button key={i} onClick={onSuccess}
              className="rounded-2xl p-3 text-left"
              style={{ background: "white", border: `1px solid ${B.line}` }}>
              <div className="text-sm font-bold" style={{ color: B.ink }}>{d.name}</div>
              <div className="text-[10px] mb-2" style={{ color: B.sub }}>{d.brand}</div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1"
                style={{ background: B.successSoft, color: B.success }}>
                <Check size={9} color={B.success} strokeWidth={3} />
                eSIM ready
              </span>
            </button>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-10 text-sm" style={{ color: B.sub }}>
            No devices match your search.
          </div>
        )}

        <div className="mt-5 text-center">
          <button onClick={() => setDeviceSupported(false)}
            className="text-xs font-semibold underline" style={{ color: B.sub }}>
            Can't find my device
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   INSTALL GUIDE
============================================================ */
function InstallGuide({ onBack }) {
  const [os, setOs] = useState("ios");
  const ios = [
    "Open Settings → Cellular",
    "Tap Add Cellular Plan",
    "Scan the QR code from your order email",
    "Label it 'Kalimi' and set it as secondary line",
    "Enable Data Roaming on the Kalimi line",
  ];
  const android = [
    "Open Settings → Network & internet",
    "Tap SIMs → Add eSIM",
    "Scan the QR code from your order email",
    "Follow the prompts to download the profile",
    "Enable Data Roaming on the Kalimi line",
  ];
  const steps = os === "ios" ? ios : android;
  return (
    <div>
      <BackHeader title="Installation guide" onBack={onBack} />
      <div className="px-5 pb-6">
        <div className="flex gap-2 mb-4">
          {["ios", "android"].map((x) => (
            <button key={x} onClick={() => setOs(x)}
              className="flex-1 py-2 rounded-full text-xs font-semibold"
              style={{
                background: os === x ? B.ink : "white",
                color: os === x ? "white" : B.ink,
                border: `1px solid ${os === x ? B.ink : B.line}`,
              }}>
              {x === "ios" ? "iOS" : "Android"}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {steps.map((s, i) => (
            <Card key={i}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: B.yellow, color: B.ink }}>{i + 1}</div>
                <span className="text-sm" style={{ color: B.ink }}>{s}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   PROFILE
============================================================ */
function ProfileHome({ user, onItem, onEdit, onLogout }) {
  const sections = [
    { title: "Account", items: [
      { Icon: User,        label: "Personal info",   key: "personal" },
      { Icon: CreditCard,  label: "Payment methods", key: "payments" },
      { Icon: FileText,    label: "Order history",   key: "orders" },
    ]},
    { title: "Preferences", items: [
      { Icon: Bell,        label: "Notifications",   key: "notifications" },
      { Icon: Settings,    label: "Settings",        key: "settings" },
      { Icon: Info,        label: "About Kalimi",    key: "about" },
    ]},
  ];
  return (
    <div className="px-5 pt-2 pb-6">
      <Headline size={24}>Profile</Headline>
      <Card className="mt-4 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold"
            style={{ background: B.yellow, color: B.ink }}>{user.initials}</div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-bold truncate" style={{ color: B.ink }}>{user.name}</div>
            <div className="text-xs truncate" style={{ color: B.sub }}>{user.email}</div>
          </div>
          <button onClick={onEdit} className="text-xs font-semibold" style={{ color: B.ink }}>Edit</button>
        </div>
      </Card>

      {sections.map((sec) => (
        <div key={sec.title} className="mb-4">
          <div className="text-[10px] uppercase tracking-wider font-bold mb-2 px-1" style={{ color: B.sub }}>
            {sec.title}
          </div>
          <Card noPad>
            {sec.items.map((i, idx) => {
              const I = i.Icon;
              return (
                <button key={i.key} onClick={() => onItem(i.key)}
                  className="flex items-center gap-3 px-4 py-3.5 w-full text-left"
                  style={{ borderBottom: idx < sec.items.length - 1 ? `1px solid ${B.lineSoft}` : "none" }}>
                  <span style={{ color: B.ink }}><I size={16} /></span>
                  <span className="text-sm flex-1" style={{ color: B.ink }}>{i.label}</span>
                  <ChevronRight size={14} color={B.sub} />
                </button>
              );
            })}
          </Card>
        </div>
      ))}

      <button onClick={onLogout}
        className="w-full flex items-center justify-center gap-2 py-3 text-sm font-bold" style={{ color: B.danger }}>
        <LogOut size={15} />
        Sign out
      </button>
    </div>
  );
}

function PersonalInfo({ user, setUser, onBack }) {
  const [draft, setDraft] = useState(user);
  const [dirty, setDirty] = useState(false);
  const update = (k, v) => { setDraft((d) => ({ ...d, [k]: v })); setDirty(true); };
  const save = () => {
    const parts = draft.name.trim().split(" ");
    const initials = parts.length >= 2
      ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
      : draft.name.slice(0, 2).toUpperCase();
    setUser({ ...draft, initials });
    setDirty(false);
  };
  const fields = [
    { key: "name",    label: "Full name", type: "text" },
    { key: "email",   label: "Email",     type: "email" },
    { key: "phone",   label: "Phone",     type: "tel" },
    { key: "country", label: "Country",   type: "text" },
  ];
  return (
    <div className="flex flex-col h-full">
      <BackHeader title="Personal info" onBack={onBack} />
      <div className="flex-1 overflow-y-auto kalimi-scroll px-5 pb-6">
        <Card noPad>
          {fields.map((f, i) => (
            <div key={f.key} className="px-4 py-3"
              style={{ borderBottom: i < fields.length - 1 ? `1px solid ${B.lineSoft}` : "none" }}>
              <label className="text-[10px] uppercase tracking-wider font-bold block mb-1" style={{ color: B.sub }}>
                {f.label}
              </label>
              <input type={f.type} value={draft[f.key]}
                onChange={(e) => update(f.key, e.target.value)}
                className="w-full text-sm font-semibold bg-transparent outline-none" style={{ color: B.ink }} />
            </div>
          ))}
        </Card>
      </div>
      {dirty && (
        <div className="px-5 py-3" style={{ background: "white", borderTop: `1px solid ${B.line}` }}>
          <PillButton onClick={save} primary>Save changes</PillButton>
        </div>
      )}
    </div>
  );
}

function PaymentMethods({ onBack }) {
  const [methods, setMethods] = useState([
    { id: "m1", type: "card",  label: "Visa •••• 4242", sub: "Expires 04/28", isDefault: true },
    { id: "m2", type: "apple", label: "Apple Pay",       sub: "Ready to use",  isDefault: false },
  ]);
  const [adding, setAdding] = useState(false);
  const [newCard, setNewCard] = useState({ number: "", exp: "", cvc: "" });

  const makeDefault = (id) => setMethods((m) => m.map((x) => ({ ...x, isDefault: x.id === id })));
  const remove = (id) => setMethods((m) => m.filter((x) => x.id !== id));
  const addCard = () => {
    if (!newCard.number || !newCard.exp) return;
    const last4 = newCard.number.slice(-4);
    setMethods((m) => [...m, {
      id: `m${Date.now()}`, type: "card",
      label: `Card •••• ${last4}`, sub: `Expires ${newCard.exp}`, isDefault: false,
    }]);
    setNewCard({ number: "", exp: "", cvc: "" });
    setAdding(false);
  };

  return (
    <div>
      <BackHeader title="Payment methods" onBack={onBack} />
      <div className="px-5 pb-6 flex flex-col gap-2">
        {methods.map((m) => {
          const I = m.type === "card" ? CreditCard : Smartphone;
          return (
            <Card key={m.id}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: B.lineSoft }}>
                  <I size={18} color={B.ink} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold truncate" style={{ color: B.ink }}>{m.label}</div>
                  <div className="text-xs truncate" style={{ color: B.sub }}>{m.sub}</div>
                </div>
                {m.isDefault ? (
                  <span className="text-[10px] font-bold px-2 py-1 rounded-full"
                    style={{ background: B.yellowSoft, color: B.ink }}>DEFAULT</span>
                ) : (
                  <div className="flex gap-1">
                    <button onClick={() => makeDefault(m.id)}
                      className="text-[10px] font-bold px-2 py-1 rounded-full"
                      style={{ background: B.lineSoft, color: B.ink }}>Set default</button>
                    <button onClick={() => remove(m.id)}
                      className="w-7 h-7 rounded-full flex items-center justify-center">
                      <Trash2 size={14} color={B.sub} />
                    </button>
                  </div>
                )}
              </div>
            </Card>
          );
        })}

        {adding ? (
          <Card>
            <div className="text-xs font-bold mb-2" style={{ color: B.ink }}>New card</div>
            <input placeholder="Card number" value={newCard.number}
              onChange={(e) => setNewCard((c) => ({ ...c, number: e.target.value }))}
              className="w-full px-3 py-2.5 text-sm outline-none mb-2"
              style={{ background: B.lineSoft, borderRadius: 10 }} />
            <div className="grid grid-cols-2 gap-2 mb-3">
              <input placeholder="MM/YY" value={newCard.exp}
                onChange={(e) => setNewCard((c) => ({ ...c, exp: e.target.value }))}
                className="px-3 py-2.5 text-sm outline-none"
                style={{ background: B.lineSoft, borderRadius: 10 }} />
              <input placeholder="CVC" value={newCard.cvc}
                onChange={(e) => setNewCard((c) => ({ ...c, cvc: e.target.value }))}
                className="px-3 py-2.5 text-sm outline-none"
                style={{ background: B.lineSoft, borderRadius: 10 }} />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <PillButton onClick={() => setAdding(false)}>Cancel</PillButton>
              <PillButton onClick={addCard} primary>Add card</PillButton>
            </div>
          </Card>
        ) : (
          <Card onClick={() => setAdding(true)}>
            <div className="flex items-center gap-3">
              <Plus size={18} color={B.ink} />
              <span className="text-sm font-semibold" style={{ color: B.ink }}>Add payment method</span>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

function NotificationsSettings({ onBack }) {
  const [vals, setVals] = useState({ offers: true, lowData: true, updates: false, tips: true });
  const items = [
    { key: "offers",  label: "Special offers & vouchers", sub: "Welcome offers and discounts" },
    { key: "lowData", label: "Low data alerts",           sub: "We'll notify you at 80% used" },
    { key: "updates", label: "Order updates",             sub: "When your eSIM is ready" },
    { key: "tips",    label: "Travel tips",               sub: "Guides for your destination" },
  ];
  return (
    <div>
      <BackHeader title="Notifications" onBack={onBack} />
      <div className="px-5 pb-6">
        <Card noPad>
          {items.map((i, idx) => (
            <div key={i.key} className="flex items-center gap-3 px-4 py-3.5"
              style={{ borderBottom: idx < items.length - 1 ? `1px solid ${B.lineSoft}` : "none" }}>
              <div className="flex-1">
                <div className="text-sm font-semibold" style={{ color: B.ink }}>{i.label}</div>
                <div className="text-[11px]" style={{ color: B.sub }}>{i.sub}</div>
              </div>
              <Toggle on={vals[i.key]} onChange={() => setVals((v) => ({ ...v, [i.key]: !v[i.key] }))} />
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

function Toggle({ on, onChange }) {
  return (
    <button onClick={onChange} className="rounded-full transition-all relative"
      style={{ width: 42, height: 24, background: on ? B.yellow : B.line }}>
      <div className="absolute rounded-full transition-all"
        style={{ width: 18, height: 18, top: 3, left: on ? 21 : 3, background: "white", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
    </button>
  );
}

function OrderHistory({ onBack }) {
  return (
    <div>
      <BackHeader title="Order history" onBack={onBack} />
      <div className="px-5 pb-6 flex flex-col gap-2">
        {ORDERS.map((o) => (
          <Card key={o.id} onClick={() => {}}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: B.yellowSoft }}>
                {o.flag}
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold" style={{ color: B.ink }}>{o.country} • {o.data}</div>
                <div className="text-[11px]" style={{ color: B.sub }}>{o.date} · {o.id}</div>
              </div>
              <div className="text-sm font-bold" style={{ color: B.ink }}>{o.total}</div>
              <ChevronRight size={14} color={B.sub} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function SettingsScreen({ onBack, onLang }) {
  const [darkMode, setDarkMode] = useState(false);
  const [biometric, setBiometric] = useState(true);
  return (
    <div>
      <BackHeader title="Settings" onBack={onBack} />
      <div className="px-5 pb-6 flex flex-col gap-3">
        <Card noPad>
          <button onClick={onLang} className="flex items-center gap-3 px-4 py-3.5 w-full text-left"
            style={{ borderBottom: `1px solid ${B.lineSoft}` }}>
            <Languages size={16} color={B.ink} />
            <span className="text-sm flex-1" style={{ color: B.ink }}>Language & currency</span>
            <span className="text-xs" style={{ color: B.sub }}>EN · $</span>
            <ChevronRight size={14} color={B.sub} />
          </button>
          <div className="flex items-center gap-3 px-4 py-3.5" style={{ borderBottom: `1px solid ${B.lineSoft}` }}>
            <Moon size={16} color={B.ink} />
            <span className="text-sm flex-1" style={{ color: B.ink }}>Dark mode</span>
            <Toggle on={darkMode} onChange={() => setDarkMode(!darkMode)} />
          </div>
          <div className="flex items-center gap-3 px-4 py-3.5">
            <Fingerprint size={16} color={B.ink} />
            <span className="text-sm flex-1" style={{ color: B.ink }}>Biometric sign in</span>
            <Toggle on={biometric} onChange={() => setBiometric(!biometric)} />
          </div>
        </Card>

        <Card noPad>
          <button className="flex items-center gap-3 px-4 py-3.5 w-full text-left"
            style={{ borderBottom: `1px solid ${B.lineSoft}` }}>
            <Shield size={16} color={B.ink} />
            <span className="text-sm flex-1" style={{ color: B.ink }}>Privacy</span>
            <ChevronRight size={14} color={B.sub} />
          </button>
          <button className="flex items-center gap-3 px-4 py-3.5 w-full text-left"
            style={{ borderBottom: `1px solid ${B.lineSoft}` }}>
            <FileText size={16} color={B.ink} />
            <span className="text-sm flex-1" style={{ color: B.ink }}>Terms of service</span>
            <ChevronRight size={14} color={B.sub} />
          </button>
          <div className="flex items-center gap-3 px-4 py-3.5">
            <Info size={16} color={B.ink} />
            <span className="text-sm flex-1" style={{ color: B.ink }}>App version</span>
            <span className="text-xs" style={{ color: B.sub }}>2.4.1</span>
          </div>
        </Card>
      </div>
    </div>
  );
}

function AboutScreen({ onBack }) {
  return (
    <div>
      <BackHeader title="About" onBack={onBack} />
      <div className="px-5 pb-6 flex flex-col items-center text-center">
        <div className="my-6"><Logo size={40} /></div>
        <Headline size={22} underline="Mobile data">made affordable</Headline>
        <p className="text-sm mt-4 leading-relaxed" style={{ color: B.sub }}>
          Kalimi gives you affordable mobile data in 200+ destinations. No roaming fees, no contracts — just easy, instant connectivity wherever you travel.
        </p>
        <div className="grid grid-cols-3 gap-2 w-full mt-6">
          {[
            { n: "200+", l: "Destinations" },
            { n: "48+",  l: "Devices" },
            { n: "2min", l: "Setup" },
          ].map((s) => (
            <div key={s.l} className="rounded-2xl py-4 text-center" style={{ background: B.yellowSoft }}>
              <div className="text-lg font-bold" style={{ color: B.ink }}>{s.n}</div>
              <div className="text-[11px]" style={{ color: B.sub }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   TAB BAR
============================================================ */
function TabBar({ tab, onChange }) {
  const tabs = [
    { key: "shop",    label: "Shop",     Icon: Home },
    { key: "esims",   label: "My eSIMs", Icon: Smartphone },
    { key: "help",    label: "Help",     Icon: HelpCircle },
    { key: "profile", label: "Profile",  Icon: User },
  ];
  return (
    <div className="flex items-center justify-around pt-2 pb-6"
      style={{ background: "white", borderTop: `1px solid ${B.line}` }}>
      {tabs.map((t) => {
        const active = tab === t.key;
        const I = t.Icon;
        return (
          <button key={t.key} onClick={() => onChange(t.key)}
            className="flex flex-col items-center gap-1 px-3 py-1 relative">
            {active && <div className="absolute -top-2.5 w-8 h-1 rounded-full" style={{ background: B.yellow }} />}
            <I size={22} color={active ? B.ink : B.sub} strokeWidth={active ? 2.3 : 1.8} />
            <span className="text-[10px] font-bold" style={{ color: active ? B.ink : B.sub }}>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}

/* ============================================================
   NOTIFICATIONS SLIDEOUT
============================================================ */
function NotifSlideout({ notifications, onClose, onClear }) {
  return (
    <div className="absolute inset-0 z-40 kalimi-fade-in"
      style={{ background: "rgba(0,0,0,0.4)" }} onClick={onClose}>
      <div className="absolute top-0 right-0 h-full w-[86%] overflow-y-auto kalimi-scroll kalimi-slide-right"
        style={{ background: "white" }} onClick={(e) => e.stopPropagation()}>
        <div className="h-12" />
        <div className="px-4 py-3 flex items-center justify-between" style={{ borderBottom: `1px solid ${B.line}` }}>
          <div className="flex items-center gap-2">
            <Bell size={18} color={B.ink} />
            <h2 className="text-base font-bold" style={{ color: B.ink }}>Notifications</h2>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={onClear} className="text-xs font-semibold px-2 py-1" style={{ color: B.sub }}>Clear all</button>
            <button onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: B.lineSoft }}>
              <X size={15} color={B.ink} />
            </button>
          </div>
        </div>

        <div className="p-3 flex flex-col gap-2">
          {notifications.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3" style={{ background: B.lineSoft }}>
                <BellOff size={24} color={B.sub} />
              </div>
              <div className="text-sm font-bold" style={{ color: B.ink }}>You're all caught up</div>
              <div className="text-xs mt-1" style={{ color: B.sub }}>No new notifications</div>
            </div>
          ) : (
            notifications.map((n) => {
              const I = n.icon;
              const accentBg = { yellow: B.yellow, success: B.successSoft, danger: B.dangerSoft }[n.accent] || B.yellowSoft;
              const iconColor = { yellow: B.ink, success: B.success, danger: B.danger }[n.accent] || B.ink;
              return (
                <div key={n.id} className="flex gap-3 p-3 rounded-2xl relative"
                  style={{ background: n.unread ? B.yellowSoft : "white", border: `1px solid ${B.line}` }}>
                  <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: accentBg }}>
                    <I size={16} color={iconColor} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="text-xs font-bold" style={{ color: B.ink }}>{n.title}</div>
                      {n.unread && <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1" style={{ background: B.danger }} />}
                    </div>
                    <div className="text-[11px] leading-relaxed mt-0.5" style={{ color: B.ink2 }}>{n.body}</div>
                    <div className="text-[10px] mt-1" style={{ color: B.sub }}>{n.time}</div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   SHEET + MODALS
============================================================ */
function Sheet({ children, onClose }) {
  return (
    <div className="absolute inset-0 z-40 flex items-end justify-center kalimi-fade-in"
      style={{ background: "rgba(0,0,0,0.5)" }} onClick={onClose}>
      <div className="w-full rounded-t-3xl p-6 relative kalimi-slide-up"
        style={{ background: "white" }} onClick={(e) => e.stopPropagation()}>
        <div className="w-10 h-1 rounded-full mx-auto mb-4" style={{ background: B.line }} />
        {onClose && (
          <button onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: B.lineSoft }}>
            <X size={15} color={B.ink} />
          </button>
        )}
        {children}
      </div>
    </div>
  );
}

function IncompatiblePopup({ onClose }) {
  return (
    <Sheet>
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ background: B.dangerSoft }}>
          <AlertTriangle size={30} color={B.danger} />
        </div>
        <h3 className="text-lg font-bold mb-2" style={{ color: B.ink }}>Device not compatible</h3>
        <p className="text-sm leading-relaxed mb-5" style={{ color: B.sub }}>
          Your device does not support eSIM. eSIM plans that you can purchase via this app will not work on this device.
        </p>
        <PillButton onClick={onClose} secondary>Got it</PillButton>
      </div>
    </Sheet>
  );
}

function EmailOptInPopup({ onClose }) {
  return (
    <Sheet onClose={onClose}>
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ background: B.yellow }}>
          <Mail size={28} color={B.ink} />
        </div>
        <h3 className="text-lg font-bold mb-2" style={{ color: B.ink, letterSpacing: "-0.02em" }}>
          Get notified about special offers
        </h3>
        <p className="text-sm leading-relaxed mb-5" style={{ color: B.sub }}>
          Receive special offers, access to vouchers, or get notified when your data allowance is running low.
        </p>
        <PillButton onClick={onClose} primary>Receive offers</PillButton>
        <button onClick={onClose} className="w-full py-3 text-sm font-semibold mt-2" style={{ color: B.sub }}>
          Maybe later
        </button>
      </div>
    </Sheet>
  );
}

function LangCurrencyPopup({ onClose }) {
  const [lang, setLang] = useState("en");
  const [cur, setCur] = useState("usd");
  const langs = [["en", "English"], ["de", "Deutsch"], ["es", "Español"], ["fr", "Français"], ["it", "Italiano"]];
  const currencies = [["usd", "USD $"], ["eur", "EUR €"], ["gbp", "GBP £"]];
  return (
    <Sheet onClose={onClose}>
      <h3 className="text-base font-bold mb-3" style={{ color: B.ink }}>Language</h3>
      <div className="flex flex-col gap-1 mb-5">
        {langs.map(([k, v]) => (
          <button key={k} onClick={() => setLang(k)}
            className="flex items-center justify-between px-3 py-3 rounded-xl"
            style={{ background: lang === k ? B.yellowSoft : "transparent" }}>
            <span className="text-sm font-semibold" style={{ color: B.ink }}>{v}</span>
            {lang === k && <Check size={16} color={B.ink} strokeWidth={2.5} />}
          </button>
        ))}
      </div>
      <h3 className="text-base font-bold mb-3" style={{ color: B.ink }}>Currency</h3>
      <div className="flex gap-2 mb-5">
        {currencies.map(([k, v]) => (
          <button key={k} onClick={() => setCur(k)}
            className="flex-1 py-3 rounded-xl text-sm font-semibold"
            style={{ background: cur === k ? B.yellow : B.lineSoft, color: B.ink }}>
            {v}
          </button>
        ))}
      </div>
      <PillButton onClick={onClose} primary>Save</PillButton>
    </Sheet>
  );
}

function LocationPermPopup({ onClose }) {
  return (
    <Sheet onClose={onClose}>
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ background: B.yellow }}>
          <MapPin size={28} color={B.ink} />
        </div>
        <h3 className="text-lg font-bold mb-2" style={{ color: B.ink }}>Where are you off to?</h3>
        <p className="text-sm leading-relaxed mb-5" style={{ color: B.sub }}>
          Allow location to get destination suggestions and pre-select the right eSIM when you arrive.
        </p>
        <PillButton onClick={onClose} primary>Allow location</PillButton>
        <button onClick={onClose} className="w-full py-3 text-sm font-semibold mt-2" style={{ color: B.sub }}>Not now</button>
      </div>
    </Sheet>
  );
}

function PushPermPopup({ onClose }) {
  return (
    <Sheet onClose={onClose}>
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ background: B.yellow }}>
          <Bell size={28} color={B.ink} />
        </div>
        <h3 className="text-lg font-bold mb-2" style={{ color: B.ink }}>Stay in the loop</h3>
        <p className="text-sm leading-relaxed mb-5" style={{ color: B.sub }}>
          Push notifications tell you when your eSIM is ready, when data is running low, and when we have a new offer.
        </p>
        <PillButton onClick={onClose} primary>Turn on notifications</PillButton>
        <button onClick={onClose} className="w-full py-3 text-sm font-semibold mt-2" style={{ color: B.sub }}>Maybe later</button>
      </div>
    </Sheet>
  );
}

function LowDataPopup({ onClose }) {
  return (
    <Sheet onClose={onClose}>
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ background: B.dangerSoft }}>
          <Zap size={28} color={B.danger} />
        </div>
        <h3 className="text-lg font-bold mb-2" style={{ color: B.ink }}>You've used 80% of your data</h3>
        <p className="text-sm leading-relaxed mb-5" style={{ color: B.sub }}>
          Top up now to stay connected — same eSIM, no new install.
        </p>
        <PillButton onClick={onClose} primary>Top up</PillButton>
        <button onClick={onClose} className="w-full py-3 text-sm font-semibold mt-2" style={{ color: B.sub }}>Dismiss</button>
      </div>
    </Sheet>
  );
}

function TopUpPopup({ onClose }) {
  const [sel, setSel] = useState("t2");
  const topups = [
    { id: "t1", data: "1 GB",  days: 7,  price: "$4.50" },
    { id: "t2", data: "3 GB",  days: 15, price: "$8.90" },
    { id: "t3", data: "5 GB",  days: 30, price: "$12.50" },
    { id: "t4", data: "10 GB", days: 30, price: "$19.90" },
  ];
  return (
    <Sheet onClose={onClose}>
      <h3 className="text-lg font-bold mb-1" style={{ color: B.ink, letterSpacing: "-0.02em" }}>Top up your eSIM</h3>
      <p className="text-xs mb-4" style={{ color: B.sub }}>Same eSIM, extra data</p>
      <div className="flex flex-col gap-2 mb-5">
        {topups.map((p) => (
          <button key={p.id} onClick={() => setSel(p.id)}
            className="flex items-center justify-between p-4 rounded-2xl transition"
            style={{ background: sel === p.id ? B.yellowSoft : "white", border: `2px solid ${sel === p.id ? B.yellow : B.line}` }}>
            <div className="text-left">
              <div className="text-sm font-bold" style={{ color: B.ink }}>{p.data}</div>
              <div className="text-xs" style={{ color: B.sub }}>{p.days} days</div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold" style={{ color: B.ink }}>{p.price}</span>
              {sel === p.id && (
                <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: B.yellow }}>
                  <Check size={12} color={B.ink} strokeWidth={3} />
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
      <PillButton onClick={onClose} primary>Top up now</PillButton>
    </Sheet>
  );
}

function LogoutPopup({ onClose, onConfirm }) {
  return (
    <Sheet onClose={onClose}>
      <div className="flex flex-col items-center text-center">
        <h3 className="text-lg font-bold mb-2" style={{ color: B.ink }}>Sign out of Kalimi?</h3>
        <p className="text-sm mb-5" style={{ color: B.sub }}>You'll need to log back in to manage your eSIMs.</p>
        <PillButton onClick={onConfirm} secondary>Sign out</PillButton>
        <button onClick={onClose} className="w-full py-3 text-sm font-semibold mt-2" style={{ color: B.sub }}>Cancel</button>
      </div>
    </Sheet>
  );
}

function CompatOkPopup({ onClose }) {
  return (
    <Sheet onClose={onClose}>
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ background: B.successSoft }}>
          <CheckCircle2 size={30} color={B.success} />
        </div>
        <h3 className="text-lg font-bold mb-2" style={{ color: B.ink }}>Your device is compatible</h3>
        <p className="text-sm leading-relaxed mb-5" style={{ color: B.sub }}>
          Great news — you're ready to install a Kalimi eSIM. Pick a destination and get connected.
        </p>
        <PillButton onClick={onClose} primary>Shop eSIMs</PillButton>
      </div>
    </Sheet>
  );
}

function CoverageModal({ onClose }) {
  const [q, setQ] = useState("");
  const filtered = COVERAGE_COUNTRIES.filter((c) =>
    c.name.toLowerCase().includes(q.toLowerCase()) ||
    c.carriers.some((x) => x.n.toLowerCase().includes(q.toLowerCase()))
  );
  return (
    <div className="absolute inset-0 z-40 flex items-end justify-center kalimi-fade-in"
      style={{ background: "rgba(0,0,0,0.5)" }} onClick={onClose}>
      <div className="w-full max-h-[88%] rounded-t-3xl flex flex-col kalimi-slide-up"
        style={{ background: "white" }} onClick={(e) => e.stopPropagation()}>
        <div className="p-6 pb-3 flex-shrink-0">
          <div className="w-10 h-1 rounded-full mx-auto mb-4" style={{ background: B.line }} />
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-lg font-bold" style={{ color: B.ink }}>Additional Coverage</h3>
              <p className="text-xs" style={{ color: B.sub }}>
                {COVERAGE_COUNTRIES.length} countries & networks covered
              </p>
            </div>
            <button onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: B.lineSoft }}>
              <X size={15} color={B.ink} />
            </button>
          </div>

          <div className="flex items-center gap-2"
            style={{ background: B.lineSoft, borderRadius: 999, padding: "10px 16px" }}>
            <Search size={16} color={B.sub} />
            <input value={q} onChange={(e) => setQ(e.target.value)}
              placeholder="Search by country..."
              className="flex-1 text-sm outline-none bg-transparent" />
            {q && <button onClick={() => setQ("")}><X size={14} color={B.sub} /></button>}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto kalimi-scroll px-6 pb-2">
          {filtered.map((c, i) => (
            <div key={i} className="flex items-start gap-3 py-3"
              style={{ borderBottom: i < filtered.length - 1 ? `1px solid ${B.lineSoft}` : "none" }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-lg flex-shrink-0"
                style={{ background: B.lineSoft }}>{c.flag}</div>
              <div className="flex-1">
                <div className="text-sm font-bold" style={{ color: B.ink }}>{c.name}</div>
              </div>
              <div className="flex flex-col gap-0.5 items-end">
                {c.carriers.map((car, j) => (
                  <div key={j} className="flex items-center gap-1.5">
                    <span className="text-xs" style={{ color: B.sub }}>{car.n}</span>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded"
                      style={{ background: B.lineSoft, color: B.ink }}>{car.g}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-10 text-sm" style={{ color: B.sub }}>No countries match "{q}"</div>
          )}
        </div>

        <div className="px-6 py-3 text-center" style={{ borderTop: `1px solid ${B.line}` }}>
          <p className="text-[10px]" style={{ color: B.sub }}>
            Network availability may vary by location. 5G requires a compatible device.
          </p>
        </div>
      </div>
    </div>
  );
}
