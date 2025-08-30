import React, { useMemo, useState } from "react";

// Loja de Brainrots do Roblox — versão inicial
// — Feito para você editar rápido: nomes, imagens e preços.
// — Use o campo de busca, filtro e ordenação para navegar.
// — Botão "Pedir no WhatsApp" já monta a mensagem com o item escolhido.

const CATALOGO_INICIAL = [
  {
    id: "skibidi",
    nome: "Skibidi (Pack de Animações)",
    categoria: "Dança",
    // Troque pelo link direto da imagem do seu catálogo
    imagem: "https://placehold.co/600x600/png?text=Skibidi+Roblox",
    descricao: "Animações estilo Skibidi otimizadas para Roblox.",
    preco: null, // depois você coloca o valor em R$
    destaque: true,
  },
  {
    id: "sigma-walk",
    nome: "Sigma Walk (Bundle)",
    categoria: "Pose",
    imagem: "https://placehold.co/600x600/png?text=Sigma+Walk+Roblox",
    descricao: "Caminhada Sigma + idle pose para avatar.",
    preco: null,
    destaque: true,
  },
  {
    id: "rizz-pack",
    nome: "Rizz Pack (Expressões)",
    categoria: "Meme",
    imagem: "https://placehold.co/600x600/png?text=Rizz+Pack+Roblox",
    descricao: "Expressões e emotes temáticos de Rizz.",
    preco: null,
    destaque: false,
  },
  {
    id: "ohio",
    nome: "Ohio Core (Efeitos)",
    categoria: "Meme",
    imagem: "https://placehold.co/600x600/png?text=Ohio+Core+Roblox",
    descricao: "Pacote de efeitos sonoros e poses estilo Ohio Core.",
    preco: null,
    destaque: false,
  },
  {
    id: "grimace",
    nome: "Grimace Shake (FX)",
    categoria: "Efeito",
    imagem: "https://placehold.co/600x600/png?text=Grimace+Shake+Roblox",
    descricao: "Efeitos visuais roxos + animação curta.",
    preco: null,
    destaque: false,
  },
  {
    id: "npc-streamer",
    nome: "NPC Streamer (Voice + Emotes)",
    categoria: "Meme",
    imagem: "https://placehold.co/600x600/png?text=NPC+Streamer+Roblox",
    descricao: "Gestos e triggers de fala no estilo NPC streamer.",
    preco: null,
    destaque: false,
  },
  {
    id: "goofy",
    nome: "Goofy Ahh (Coleção)",
    categoria: "Meme",
    imagem: "https://placehold.co/600x600/png?text=Goofy+Ahh+Roblox",
    descricao: "Coleção divertida de emotes e SFX.",
    preco: null,
    destaque: false,
  },
  {
    id: "gyatt",
    nome: "GYATT Motion (Pose)",
    categoria: "Pose",
    imagem: "https://placehold.co/600x600/png?text=GYATT+Motion+Roblox",
    descricao: "Pose marcante para screenshots e thumbnails.",
    preco: null,
    destaque: false,
  },
];

function formatarPreco(preco) {
  if (preco === null || preco === undefined || preco === "") return "a definir";
  const n = Number(preco);
  if (Number.isNaN(n)) return String(preco);
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium">
      {children}
    </span>
  );
}

function Card({ children }) {
  return (
    <div className="rounded-2xl border shadow-sm hover:shadow-md transition-shadow bg-white/70 backdrop-blur">
      {children}
    </div>
  );
}

function CardMedia({ src, alt }) {
  return (
    <div className="aspect-square w-full overflow-hidden rounded-t-2xl bg-gray-100">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="h-full w-full object-cover" />
    </div>
  );
}

function CardBody({ children }) {
  return <div className="p-4 space-y-3">{children}</div>;
}

function BotaoPrimario({ children, ...props }) {
  return (
    <button
      {...props}
      className="w-full rounded-2xl px-4 py-2 font-medium shadow-sm border bg-black text-white hover:opacity-90 active:opacity-80"
    >
      {children}
    </button>
  );
}

function Toggle({ checked, onChange, label }) {
  return (
    <label className="flex items-center gap-2 text-sm">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      {label}
    </label>
  );
}

export default function LojaBrainrotsRoblox() {
  const [produtos, setProdutos] = useState(CATALOGO_INICIAL);
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("Todas");
  const [ordenacao, setOrdenacao] = useState("destaque");
  const [modoEdicao, setModoEdicao] = useState(false);

  const categorias = useMemo(() => ["Todas", ...Array.from(new Set(produtos.map(p => p.categoria)))], [produtos]);

  const filtrados = useMemo(() => {
    let lista = produtos.filter((p) =>
      p.nome.toLowerCase().includes(busca.toLowerCase()) ||
      p.descricao.toLowerCase().includes(busca.toLowerCase())
    );
    if (categoria !== "Todas") {
      lista = lista.filter((p) => p.categoria === categoria);
    }
    if (ordenacao === "destaque") {
      lista = lista.sort((a, b) => Number(b.destaque) - Number(a.destaque));
    } else if (ordenacao === "preco_asc") {
      lista = lista.sort((a, b) => (a.preco ?? Infinity) - (b.preco ?? Infinity));
    } else if (ordenacao === "preco_desc") {
      lista = lista.sort((a, b) => (b.preco ?? -Infinity) - (a.preco ?? -Infinity));
    } else if (ordenacao === "az") {
      lista = lista.sort((a, b) => a.nome.localeCompare(b.nome));
    }
    return [...lista];
  }, [produtos, busca, categoria, ordenacao]);

  function atualizarPreco(id, valor) {
    setProdutos((prev) => prev.map((p) => (p.id === id ? { ...p, preco: valor === "" ? null : Number(valor) } : p)));
  }

  function atualizarImagem(id, url) {
    setProdutos((prev) => prev.map((p) => (p.id === id ? { ...p, imagem: url } : p)));
  }

  function linkWhatsApp(p) {
    const texto = encodeURIComponent(`Olá! Quero o brainrot: ${p.nome} — Preço: ${formatarPreco(p.preco)}.`);
    // Coloque seu número no formato 55DDDNUMERO, ex: 5599999999999
    const numero = "SEU_NUMERO_AQUI";
    return `https://wa.me/${numero}?text=${texto}`;
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100 text-zinc-900">
      {/* Header */}
      <header className="sticky top-0 z-10 backdrop-blur bg-white/70 border-b">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-3">
          <div className="h-9 w-9 rounded-2xl bg-black text-white grid place-items-center text-lg font-bold">BR</div>
          <div className="flex-1">
            <h1 className="text-lg font-bold leading-tight">Loja de Brainrots — Roblox</h1>
            <p className="text-xs text-zinc-600">Animações, poses, emotes e efeitos prontos para o seu avatar.</p>
          </div>
          <Toggle checked={modoEdicao} onChange={setModoEdicao} label="Modo edição" />
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 py-10 grid gap-6 md:grid-cols-[1.2fr,0.8fr] items-center">
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Brainrots de referência para Roblox
          </h2>
          <p className="text-zinc-700 max-w-prose">
            Escolha seu pack favorito e peça direto pelo WhatsApp. Assim que você me passar os valores, eu coloco aqui.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex-1 min-w-[220px]">
              <input
                type="text"
                placeholder="Buscar brainrot..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="w-full rounded-2xl border px-4 py-2 shadow-sm focus:outline-none focus:ring-2"
              />
            </div>
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="rounded-2xl border px-3 py-2 shadow-sm"
            >
              {categorias.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <select
              value={ordenacao}
              onChange={(e) => setOrdenacao(e.target.value)}
              className="rounded-2xl border px-3 py-2 shadow-sm"
            >
              <option value="destaque">Ordenar: Destaque</option>
              <option value="az">Ordenar: A→Z</option>
              <option value="preco_asc">Ordenar: Menor preço</option>
              <option value="preco_desc">Ordenar: Maior preço</option>
            </select>
          </div>
          <div className="flex items-center gap-2 text-xs text-zinc-600">
            <Badge>Entrega digital</Badge>
            <Badge>Compatível com Roblox</Badge>
            <Badge>Atualizações rápidas</Badge>
          </div>
        </div>
        <Card>
          <CardMedia src="https://placehold.co/800x600/png?text=Banner+Brainrots+Roblox" alt="Banner Brainrots Roblox" />
          <CardBody>
            <p className="text-sm text-zinc-700">
              Dica: no modo edição você consegue definir os preços e trocar as imagens por links dos seus próprios brainrots.
            </p>
          </CardBody>
        </Card>
      </section>

      {/* Painel de edição */}
      {modoEdicao && (
        <section className="mx-auto max-w-7xl px-4 pb-6">
          <Card>
            <CardBody>
              <h3 className="text-lg font-bold">Editar catálogo (rápido)</h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {produtos.map((p) => (
                  <div key={p.id} className="space-y-2">
                    <div className="text-sm font-medium">{p.nome}</div>
                    <label className="block text-xs text-zinc-600">Preço (R$)</label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={p.preco ?? ""}
                      onChange={(e) => atualizarPreco(p.id, e.target.value)}
                      className="w-full rounded-xl border px-3 py-2"
                      placeholder="ex: 9.90"
                    />
                    <label className="block text-xs text-zinc-600">URL da imagem</label>
                    <input
                      type="url"
                      value={p.imagem}
                      onChange={(e) => atualizarImagem(p.id, e.target.value)}
                      className="w-full rounded-xl border px-3 py-2"
                      placeholder="https://..."
                    />
                  </div>
                ))}
              </div>
              <p className="text-xs text-zinc-500">As alterações ficam salvas enquanto a página estiver aberta.</p>
            </CardBody>
          </Card>
        </section>
      )}

      {/* Lista de produtos */}
      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtrados.map((p) => (
            <Card key={p.id}>
              <CardMedia src={p.imagem} alt={p.nome} />
              <CardBody>
                <div className="flex items-center justify-between">
                  <h3 className="font-bold leading-tight pr-2">{p.nome}</h3>
                  <Badge>{p.categoria}</Badge>
                </div>
                <p className="text-sm text-zinc-700 line-clamp-2">{p.descricao}</p>
                <div className="text-base font-semibold">{formatarPreco(p.preco)}</div>
                <div className="grid grid-cols-2 gap-2">
                  <a href={linkWhatsApp(p)} target="_blank" rel="noreferrer">
                    <BotaoPrimario>Pedir no WhatsApp</BotaoPrimario>
                  </a>
                  <button
                    onClick={() => navigator.clipboard.writeText(linkWhatsApp(p))}
                    className="rounded-2xl px-4 py-2 font-medium border shadow-sm hover:bg-zinc-50"
                  >
                    Copiar link
                  </button>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>

      {/* Rodapé */}
      <footer className="border-t bg-white/70 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-6 text-sm text-zinc-600 flex flex-wrap items-center gap-2 justify-between">
          <p>© {new Date().getFullYear()} Sua Loja de Brainrots. Todos os direitos reservados.</p>
          <div className="flex items-center gap-3">
            <a className="underline" href="#">Termos</a>
            <a className="underline" href="#">Suporte</a>
            <a className="underline" href="#">Instagram</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
