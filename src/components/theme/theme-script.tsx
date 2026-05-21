export function ThemeScript() {
  const script = `(function(){var t=localStorage.getItem('mymag-theme');if(t==='light'){document.documentElement.classList.remove('dark')}else{document.documentElement.classList.add('dark')}})();`
  return <script dangerouslySetInnerHTML={{ __html: script }} />
}
