import Link from "next/link";

export default function NoEncontrada() {
  return (
    <main className="mx-auto w-full max-w-md px-6 py-24 text-center">
      <p className="font-mono text-sm font-semibold tracking-widest text-slate-400">404</p>
      <h1 className="mt-3 text-2xl font-bold tracking-tight">No encontramos esa orden</h1>
      <p className="mt-2 text-sm text-slate-500">
        Puede que se haya eliminado o que el enlace esté mal escrito.
      </p>

      <Link
        href="/"
        className="mt-6 inline-block rounded-[10px] bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-800"
      >
        Volver a las órdenes
      </Link>
    </main>
  );
}
