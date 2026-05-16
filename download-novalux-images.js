#!/usr/bin/env node
/**
 * NovaLux seat images downloader
 *
 * What this does
 * --------------
 * Downloads every NovaLux product image from Shopify into
 *     public/images/novalux/<key>-<n>.webp
 *
 * How to run it
 * -------------
 * 1) Save this file to your project root (same place as package.json)
 * 2) Open a terminal in that folder
 * 3) Run:        node download-novalux-images.js
 * 4) Wait 10-20 seconds. Watch for the green checks.
 *
 * Requirements: Node 18+ (uses built-in fetch). Nothing else.
 */

const fs = require('node:fs');
const path = require('node:path');

const OUT_DIR = path.join(process.cwd(), 'public', 'images', 'novalux');

// ─── All product images keyed by product slug ───────────────────────────────
const IMAGES = {
  // NovaLux Triple Van Seat (hero/flagship)
  'triple': [
    'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/ChatGPT_Image_Dec_9_2025_12_49_38_PM_1_fa4d6fda-e371-40b6-80f7-51b05d9ae3b1.webp?v=1776290613',
    'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/ChatGPT_Image_Dec_9_2025_12_38_00_PM_1.webp?v=1776290613',
    'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/triple_seat_to_bed_1_a1dd06c4-df36-43d4-92eb-138bc2109358.webp?v=1776290613',
    'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/IMG_6207_1.webp?v=1776290613',
    'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/IMG_6208_1.webp?v=1776290613',
    'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/IMG_6206_1.webp?v=1776290613',
  ],

  // NovaLux Duo XR — $4,400
  'duo-xr': [
    'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/1_a569fed3-b694-4555-aaa9-bf78a2c08b98.webp?v=1776376215',
    'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/2_d6b86ab0-c213-4676-8207-8d487ee46af0.webp?v=1776376215',
    'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/3_1f82f0c9-98c5-4a1e-962d-83cc145b87c0.webp?v=1778830966',
    'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/3_1f82f0c9-98c5-4a1e-962d-83cc145b87c0_1.webp?v=1776376215',
    'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/4_35eb865e-f346-43f6-a693-42fcd9f908b4.webp?v=1776376215',
  ],

  // NovaLux Duo SX 33" (80cm) — $4,100
  'duo-sx': [
    'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/2_1_1_0bf38244-aeaa-41ec-95a5-847a10f7c7d9.webp?v=1776288477',
    'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/5_1_1.webp?v=1776288313',
    'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/1_f9c3153e-d67c-459b-9bb7-b3c011016853_1.webp?v=1776288314',
    'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/6_a6e6fb45-94b7-47a3-9b73-ed64ee7857ce_1.webp?v=1776288314',
    'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/3_5865fd58-d313-4074-a47d-2d192e9106a1_1.webp?v=1776288313',
    'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/4_d833e8df-b642-4b53-965b-160d1a0940b4_1.webp?v=1776288313',
    'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/7_9c9b4de6-348e-4dd3-ba6c-3b8d143396ea_1.webp?v=1776288314',
    'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/5_2546da34-c779-4f7f-b2d7-1ae75ba98ede_1.webp?v=1776288313',
  ],

  // NovaLux Duo GT — $3,850
  'duo-gt': [
    'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/1_1.webp?v=1776375974',
    'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/8_2_9727806d-a02a-4262-8b32-f7c1f870884e.webp?v=1776375974',
    'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/7_1_4f06b17d-26fd-416e-a758-b7a3864f71bb.webp?v=1776375974',
    'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/2_1_9bd01190-f96e-425f-a6d7-3ca669867eaf.webp?v=1776375974',
    'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/4_1_f1a9d8d1-45f6-4398-a3e2-73e40db5e713.webp?v=1776375974',
    'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/6_1_9e60e5c0-8559-4f68-9ee3-257692dac48f.webp?v=1776375974',
  ],

  // NovaLux Solo GT Seat — $3,150
  'solo-gt': [
    'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/novalux_solo_gt_seat_2_3582afbf-d3d0-4e2e-a9e4-63f02ff405c3.png?v=1778831031',
    'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/novalux_solo_gt_seat_4_11983e37-b198-4d57-b4f2-eb2de85dcc0c.png?v=1778831028',
    'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/novalux_solo_gt_seat_1.png?v=1778831024',
    'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/novalux_solo_gt_seat.png?v=1778831021',
    'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/novalux_solo_gt_seat_2.png?v=1778831020',
    'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/novalux_solo_gt_seat_3.png?v=1778830957',
    'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/novalux_solo_gt_seat_1_134979a7-fc89-48c9-b202-dfdd57e79d88.png?v=1778830926',
    'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/novalux_solo_gt_seat_base.png?v=1778830905',
    'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/novalux_solo_gt_seat_base_1.png?v=1778830877',
  ],

  // NovaLux Duo RS 35" (90cm) — $2,860 — Best Seller
  'duo-rs': [
    'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/1_e817f6ab-21d0-45ff-9596-3311e9c5c168_1.webp?v=1776291418',
    'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/2_98921d89-82b7-44ba-a9a3-04e75fd951cb_1.webp?v=1776291416',
    'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/3_aa84f925-9728-42df-a6a1-39e11e00f5a5_1.webp?v=1776291404',
  ],

  // NovaLux Solo Captain Seat — $3,350 — motorized
  'solo-captain': [
    'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/1_d75e95dc-b342-46bc-aac7-4571fe2a5cc8.webp?v=1778744896',
    'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/2_4e1e29f9-ba5a-4735-9269-7ee9c4964857.webp?v=1778744896',
    'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/3_dc21cd5b-8484-4613-9b7e-debd4060f1a3.webp?v=1778744896',
    'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/4_4273310c-b3cb-4bc3-9c9f-42020f161c28.webp?v=1778744906',
    'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/5_12e58246-d7ff-4fe4-b525-faae06e8b45b.webp?v=1778744896',
    'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/7_085eff5a-36e4-48c3-bcd9-abf4e1c6660f.webp?v=1778831198',
    'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/8_c50aba89-12b6-4d32-b7b1-51b1415f0f0b.webp?v=1778831193',
    'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/9_9faa2543-ce4d-4f4a-8326-cd7b986fb914.webp?v=1778831189',
    'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/10_8f3fd6ff-ada2-4156-ad6d-038656eafc55.webp?v=1778744896',
    'https://cdn.shopify.com/s/files/1/0803/4808/6514/files/11.webp?v=1778744896',
  ],
};

const TOTAL = Object.values(IMAGES).reduce((n, arr) => n + arr.length, 0);

function fmtSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / 1024 / 1024).toFixed(1) + ' MB';
}

async function downloadOne(url, dest) {
  const res = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36',
      'Accept': 'image/webp,image/png,image/*,*/*;q=0.8',
    },
  });
  if (!res.ok) throw new Error('HTTP ' + res.status);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(dest, buf);
  return buf.length;
}

(async () => {
  console.log('\n┌─────────────────────────────────────────────────────────────┐');
  console.log('│  NovaLux Seats — Image Downloader                           │');
  console.log('└─────────────────────────────────────────────────────────────┘\n');
  console.log('Destination: ' + OUT_DIR);
  console.log('Total files: ' + TOTAL + '\n');

  fs.mkdirSync(OUT_DIR, { recursive: true });

  let done = 0;
  let failed = 0;

  for (const [key, urls] of Object.entries(IMAGES)) {
    console.log('── ' + key + ' (' + urls.length + ' images)');
    for (let i = 0; i < urls.length; i++) {
      const ext = urls[i].includes('.png') ? '.png' : '.webp';
      const filename = key + '-' + (i + 1) + ext;
      const dest = path.join(OUT_DIR, filename);
      try {
        const size = await downloadOne(urls[i], dest);
        done++;
        console.log('   ✓  ' + filename.padEnd(40) + fmtSize(size));
      } catch (e) {
        failed++;
        console.log('   ✗  ' + filename + '   FAILED: ' + e.message);
      }
    }
  }

  console.log('\n──────────────────────────────────────────────────────────────');
  console.log('Done. ' + done + ' downloaded, ' + failed + ' failed.');
  if (failed === 0) {
    console.log('\nNext step: refresh your browser at localhost:3000');
  } else {
    console.log('\nSome files failed. Run the script again to retry.');
  }
})();
