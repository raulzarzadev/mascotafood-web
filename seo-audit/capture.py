from playwright.sync_api import sync_playwright
import json

URL = "https://mascotafood.com/"
OUT = "/Users/zarza/Documents/projects/mascota-food/seo-audit/screenshots"

def run():
    results = {}
    with sync_playwright() as p:
        browser = p.chromium.launch()

        # Desktop 1440x900
        ctx = browser.new_context(viewport={"width": 1440, "height": 900})
        page = ctx.new_page()
        page.goto(URL, wait_until="networkidle", timeout=60000)
        page.screenshot(path=f"{OUT}/desktop.png", full_page=False)
        results["desktop_title"] = page.title()
        # gather above-the-fold details
        results["desktop_h1"] = page.evaluate("() => { const h = document.querySelector('h1'); return h ? h.innerText : null; }")
        results["desktop_cta_buttons"] = page.evaluate("""
          () => Array.from(document.querySelectorAll('a, button'))
            .filter(el => {
              const r = el.getBoundingClientRect();
              return r.top < 900 && r.top >= 0 && r.width > 0 && r.height > 0;
            })
            .slice(0, 20)
            .map(el => ({
              tag: el.tagName,
              text: (el.innerText || '').trim().slice(0,80),
              href: el.getAttribute('href'),
              w: Math.round(el.getBoundingClientRect().width),
              h: Math.round(el.getBoundingClientRect().height),
              bg: getComputedStyle(el).backgroundColor,
              color: getComputedStyle(el).color
            }))
        """)
        results["desktop_logo"] = page.evaluate("""
          () => {
            const img = document.querySelector('header img, nav img, [class*=logo] img, img[alt*=logo i]');
            return img ? {src: img.src, alt: img.alt, w: img.naturalWidth, h: img.naturalHeight} : null;
          }
        """)
        results["theme_color"] = page.evaluate("() => { const m = document.querySelector('meta[name=theme-color]'); return m ? m.content : null; }")
        ctx.close()

        # Mobile viewport 390x844
        ctx = browser.new_context(viewport={"width": 390, "height": 844}, user_agent="Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1", device_scale_factor=3, is_mobile=True, has_touch=True)
        page = ctx.new_page()
        page.goto(URL, wait_until="networkidle", timeout=60000)
        page.screenshot(path=f"{OUT}/mobile.png", full_page=False)
        page.screenshot(path=f"{OUT}/mobile-fullpage.png", full_page=True)

        results["mobile_h1"] = page.evaluate("() => { const h = document.querySelector('h1'); return h ? h.innerText : null; }")
        results["mobile_scrollW"] = page.evaluate("() => document.documentElement.scrollWidth")
        results["mobile_clientW"] = page.evaluate("() => document.documentElement.clientWidth")
        results["mobile_cta_buttons"] = page.evaluate("""
          () => Array.from(document.querySelectorAll('a, button'))
            .filter(el => {
              const r = el.getBoundingClientRect();
              return r.top < 844 && r.top >= 0 && r.width > 0 && r.height > 0;
            })
            .slice(0, 25)
            .map(el => ({
              tag: el.tagName,
              text: (el.innerText || '').trim().slice(0,80),
              href: el.getAttribute('href'),
              w: Math.round(el.getBoundingClientRect().width),
              h: Math.round(el.getBoundingClientRect().height),
              bg: getComputedStyle(el).backgroundColor,
              color: getComputedStyle(el).color,
              fontSize: getComputedStyle(el).fontSize
            }))
        """)
        results["mobile_hamburger"] = page.evaluate("""
          () => {
            const candidates = Array.from(document.querySelectorAll('button, [role=button], [aria-label*=menu i], [class*=hamburg i], [class*=menu-toggle i]'));
            const btn = candidates.find(el => {
              const r = el.getBoundingClientRect();
              return r.top < 100 && r.width > 0;
            });
            return btn ? {text: btn.innerText, aria: btn.getAttribute('aria-label'), w: Math.round(btn.getBoundingClientRect().width), h: Math.round(btn.getBoundingClientRect().height)} : null;
          }
        """)
        results["mobile_images_above_fold"] = page.evaluate("""
          () => Array.from(document.images)
            .filter(img => { const r = img.getBoundingClientRect(); return r.top < 844 && r.width > 0; })
            .map(img => ({src: img.currentSrc || img.src, w: img.naturalWidth, h: img.naturalHeight, alt: img.alt, loading: img.loading, fetchpriority: img.getAttribute('fetchpriority')}))
        """)
        results["mobile_headings"] = page.evaluate("""
          () => Array.from(document.querySelectorAll('h1,h2,h3')).slice(0,20).map(h => ({tag: h.tagName, text: h.innerText.slice(0,120), fontSize: getComputedStyle(h).fontSize}))
        """)
        results["mobile_body_font"] = page.evaluate("() => getComputedStyle(document.body).fontSize")

        ctx.close()
        browser.close()

    print(json.dumps(results, indent=2, ensure_ascii=False))

if __name__ == "__main__":
    run()
