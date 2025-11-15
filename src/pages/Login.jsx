import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/auth/login", form);
      console.log("Login response:", res.data);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600">Snip.ly</h1>
          <p className="text-sm text-slate-600 mt-1">
            Snip long links in a snap.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6">Sign in</h2>

          {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-slate-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={onChange}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:border-slate-400 transition"
                placeholder="you@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPwd ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={onChange}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 pr-16 focus:outline-none focus:border-slate-400 transition"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-500 hover:text-slate-700"
                >
                  {showPwd ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-blue-600 text-white font-medium py-2 transition-colors hover:bg-blue-700 disabled:opacity-50 shadow-sm hover:shadow"
            >
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>

          <p className="mt-4 text-sm text-slate-600 text-center">
            New here?{" "}
            <Link className="text-blue-600 hover:underline" to="/register">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
