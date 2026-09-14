$ErrorActionPreference='Stop'
$p='css\style.css'
$t=Get-Content -Raw $p

# --- Ocean surface recolor (navy instead of pure black) ---
$t=$t -replace '\.ftco-footer \{\s*font-size: 16px;\s*background: #[0-9a-fA-F]+;', '.ftco-footer { font-size: 16px; background: #081021;'
$t=$t -replace '\.ftco-bg-dark \{\s*background: #[0-9a-fA-F]+; \}','.ftco-bg-dark { background: #0a1628; }'
$t=$t -replace '\.hero-wrap \.overlay \{\s*position: absolute;\s*top: 0;\s*left: 0;\s*right: 0;\s*bottom: 0;\s*content: '''';\s*opacity: 0;\s*background: #[0-9a-fA-F]+; \}','.hero-wrap .overlay { position: absolute; top: 0; left: 0; right: 0; bottom: 0; content: ''''; opacity: 0; background: #081021; }'

# --- loader: navy page w/ cyan bar (was white + sky) ---
$t=$t -replace '\.progress-bar \{\s*background: #22d3ee;\s*-webkit-box-shadow: none;','.progress-bar { background: #38bdf8; -webkit-box-shadow: none;'
$t=$t -replace '(#ftco-loader \{\s*position: fixed;[^}]*?)background-color: rgba\(255, 255, 255, 0\.9\);','$1background-color: #0a1628;'
# loader container bg (fullscreen white) -> but there's also ftco-loader base rule; set the fullscreen bg navy too
$t=$t -replace '#ftco-loader\.fullscreen \{\s*padding: 0;\s*[^}]*?background-color: #[0-9a-fA-F]+;','#ftco-loader.fullscreen { padding: 0; left: 0; top: 0; width: 100%; height: 100%; -webkit-transform: none; -ms-transform: none; transform: none; background-color: #0a1628;'

# --- education reveal gradient cyan->blue (was cyan->rose) + education card tint ---
$t=$t -replace 'linear-gradient\(135deg, #22d3ee 0%, #e11d48 100%\)','linear-gradient(135deg, #22d3ee 0%, #3b82f6 100%)'
$t=$t -replace '\.education-cards \.card__label \{[^}]*?color: #[0-9a-fA-F]+; \}','.education-cards .card__label { color: #0e7490; }'

# --- services glass blur on loader/hr? no. services already ocean. ---

Set-Content -NoNewline -Encoding utf8 $p $t
"footer navy: $(([regex]::Matches($t,'#081021')).Count)"
"loader navy: $(([regex]::Matches($t,'#0a1628')).Count)"
"edu reveal rose left: $(([regex]::Matches($t,'#e11d48')).Count)"
