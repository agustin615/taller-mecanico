"""
Servidor local para ver el proyecto.

Uso:
    python servidor.py

Después abrir http://localhost:8123

Es igual a "python -m http.server", pero le dice al navegador
que no guarde nada en caché. Así, cuando editás un archivo,
ves los cambios al recargar y no una versión vieja.
"""

import http.server
import os
import socketserver

PUERTO = 8123

# Servir siempre la carpeta donde está este archivo,
# sin importar desde dónde se ejecute el comando.
os.chdir(os.path.dirname(os.path.abspath(__file__)))


class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()


with socketserver.TCPServer(("", PUERTO), Handler) as httpd:
    print(f"Servidor en http://localhost:{PUERTO}  (Ctrl+C para detener)")
    httpd.serve_forever()
