// Edit any text in the app from this file.

export const profile = {
  greeting: 'สวัสดี',
  status: 'ONLINE',
  name: 'คุณ ไอย์ณพงศ์ ริ้วศรีกุล',
}

export const profiles = {
  first: profile,
  second: { greeting: 'สวัสดี', status: 'ONLINE', name: 'คุณ ภัทรชนน รัตธนภาส', avatar: '/images/card-photo-2.png' },
  third: { greeting: 'สวัสดี', status: 'ONLINE', name: 'คุณ ธรรมเชษฐ์ เชาว์วิศวชัย', avatar: '/images/card-photo-3.png' },
  fourth: { greeting: 'สวัสดี', status: 'ONLINE', name: 'คุณ คุณธรรม พิพัฒน์ธรรมคุณ', avatar: '/images/user-4-photo.jpg' },
  fifth: { greeting: 'สวัสดี', status: 'ONLINE', name: 'คุณ ธนันท์รัฐ วัฒนสินศักดิ์', avatar: '/images/user-5-photo.jpg' },
  sixth: { greeting: 'สวัสดี', status: 'ONLINE', name: 'คุณ ผู้ใช้งานคนที่หก' },
  seventh: { greeting: 'สวัสดี', status: 'ONLINE', name: 'คุณ ผู้ใช้งานคนที่เจ็ด', avatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-G3iNnAve0g2Q9zSGnJwPzwGosRGENp.png' },
  eighth: { greeting: 'สวัสดี', status: 'ONLINE', name: 'คุณ วีริณฒิรา วงศ์ธนินยา', avatar: '/images/alpha/portrait-eighth.png' },
  ninth: { greeting: 'สวัสดี', status: 'ONLINE', name: 'คุณ ผู้ใช้งานคนที่เก้า' },
  tenth: { greeting: 'สวัสดี', status: 'ONLINE', name: 'คุณ ศิวกร สุสัมพันธ์ไพบูลย์', avatar: '/images/card-photo-siwakorn.png' },
} as const

export const card = {
  titleTh: 'บัตรสมาชิก',
  titleEn: 'Member Card',
  numberLabelTh: 'หมายเลขสมาชิก',
  numberLabelEn: 'Member Number',
  number: '1 2345 67890 12 3',
  fullNameLabel: 'ชื่อตัวและชื่อสกุล',
  fullNameTh: 'นาย ชื่อ นามสกุล',
  firstNameLabel: 'Name',
  firstNameEn: 'Mr. Firstname',
  lastNameLabel: 'Last Name',
  lastNameEn: 'Lastname',
  birthLabelTh: 'เกิดวันที่',
  birthTh: '1 ม.ค. 2540',
  birthLabelEn: 'Date of Birth',
  birthEn: '1 Jan. 1997',
  address: 'ที่อยู่ 123/45 ถนนตัวอย่าง แขวงตัวอย่าง เขตตัวอย่าง กรุงเทพมหานคร',
  issueTh: '1 ม.ค. 2567',
  issueLabelTh: 'วันออกบัตร',
  issueEn: '1 Jan. 2024',
  issueLabelEn: 'Date of Issue',
  expiryTh: '1 ม.ค. 2575',
  expiryLabelTh: 'วันบัตรหมดอายุ',
  expiryEn: '1 Jan. 2032',
  expiryLabelEn: 'Date of Expiry',
  photoCode: '0000-00-00000000',
  backTitle: 'ด้านหลังบัตร',
  backNote: 'แตะที่ข้อความเพื่อแก้ไข หรือกดปุ่มด้านล่างเพื่อพลิกบัตร',
  expandLabel: 'ขยายรูปบัตร',
  collapseLabel: 'ย่อรูปบัตร',
  infoLabel: 'ข้อมูลบัตร',
}

// The first PIN (10201020) is the template: every other profile inherits it and overrides only identity fields.
export type CardSeal = {
  /** Circle centre, % of card width / height */
  x: number
  y: number
  /** Circle diameter, % of card width */
  size: number
  /** Direction (deg) the rainbow band travels across this circle */
  angle: number
}

export type NumberOverlay = {
  text: string
  /** Left edge / vertical centre of the text, % of card width / height */
  x: number
  y: number
  /** Font size, % of card width (cqw) */
  size: number
  /** 'center' treats x as the horizontal centre of the text */
  align?: 'left' | 'center'
  color?: string
}

// Seal positions for cards built from a provided full-card image (same template).
const providedCardSeals: CardSeal[] = [
  { x: -1.31, y: 21.37, size: 11.93, angle: 180 },
  { x: 22.55, y: 26.21, size: 15.04, angle: 315 },
  { x: 44.63, y: 22.12, size: 14.08, angle: 90 },
  { x: 73.63, y: 18.59, size: 15.04, angle: 225 },
  { x: 62.89, y: 42.94, size: 15.04, angle: 45 },
  { x: 42.72, y: 63.75, size: 15.04, angle: 270 },
  { x: 60.74, y: 84.01, size: 14.1, angle: 135 },
  { x: 17.66, y: 76.2, size: 11.93, angle: 0 },
]

const firstCard = {
  ...card,
  seals: providedCardSeals,
  // true = the front is drawn live by HoloIdCard from the fields below instead of a flat image
  holo: false as boolean,
  // Portrait shown on the live card (cropped from the person's photo); the default portrait is used when omitted
  portrait: undefined as string | undefined,
  number: '1 3099 03735 85 1',
  fullNameTh: 'นาย ไอย์ณพงศ์ ริ้วศรีกุล',
  firstNameEn: 'Mr. Ainapong',
  lastNameEn: 'Riewsrikul',
  birthTh: '19 พ.ย. 2548',
  birthEn: '19 Nov. 2005',
  address: 'ที่อยู่ 376 ซ.มิตรภาพ 15 ต.ในเมือง อ.เมืองนครราชสีมา จ.นครราชสีมา',
  issueTh: '19 ธ.ค. 2567',
  issueEn: '19 Dec. 2024',
  expiryTh: '18 พ.ย. 2576',
  expiryEn: '18 Nov. 2033',
  photoCode: '3001-02-12191346',
  front: {
    small: '/images/card-front-1-new.png',
    large: '/images/card-front-1-new.png',
  },
  back: {
    small: '/images/card-back-1-cropped.png',
    large: '/images/card-back-1-cropped.png',
  },
}

const liveCard = { holo: true, seals: [] } as const

export const cardProfiles = {
  first: {
    ...firstCard,
    birthTh: '19 พ.ย. 2549',
    birthEn: '19 Nov. 2006',
    // Rendered live by HoloIdCard (text, portrait and animated holographic seals are code, not an image).
    ...liveCard,
    address: 'ที่อยู่ 376 ซ.มิตราภาพ 15 ต.ในเมือง อ.เมืองนครราชสีมา จ.นครราชสีมา',
    front: {
      small: '/images/card-front-1-alpha.png',
      large: '/images/card-front-1-alpha.png',
    },
  },
  second: {
    ...firstCard,
    ...liveCard,
    portrait: '/images/alpha/portrait-second.png',
    number: '1 1014 02398 10 4',
    fullNameTh: 'นาย ภัทรชนน รัตธนภาส',
    firstNameEn: 'Mr. Phatchanon',
    lastNameEn: 'Ratthanaphas',
    birthTh: '15 เม.ย. 2549',
    birthEn: '15 Apr. 2006',
    address: 'ที่อยู่ 9/139 ซ.พหลโยธิน 9 ถ.พหลโยธิน แขวงพญาไท เขตพญาไท กรุงเทพมหานคร',
    issueTh: '25 พ.ค. 2567',
    issueEn: '25 May 2024',
    expiryTh: '14 เม.ย. 2576',
    expiryEn: '14 Apr. 2033',
    photoCode: '1014-02-05251541',
    front: {
      small: '/images/card-front-2-provided.png',
      large: '/images/card-front-2-provided.png',
    },
    back: { small: '/images/card-back-2-640.png', large: '/images/card-back-2-1100.png' },
  },
  third: {
    ...firstCard,
    ...liveCard,
    portrait: '/images/alpha/portrait-third.png',
    number: '1 1008 01640 48 0',
    fullNameTh: 'นาย ธรรมเชษฐ์ เชาว์วิศวชัย',
    firstNameEn: 'Mr. Tamachate',
    lastNameEn: 'Chaovisawachai',
    birthTh: '29 ต.ค. 2549',
    birthEn: '29 Oct. 2006',
    address: 'ที่อยู่ 217/9 ซ.ประชาอุทิศ 33 แยก 7 แขวงบางมด เขตทุ่งครุ กรุงเทพมหานคร',
    issueTh: '27 ต.ค. 2569',
    issueEn: '27 Oct. 2026',
    expiryTh: '28 ต.ค. 2578',
    expiryEn: '28 Oct. 2035',
    photoCode: '1007-04-10271552',
    front: {
      small: '/images/card-front-3-new.png',
      large: '/images/card-front-3-new.png',
    },
    back: { small: '/images/card-back-3.png', large: '/images/card-back-3.png' },
  },
  fourth: {
    ...firstCard,
    ...liveCard,
    portrait: '/images/alpha/portrait-fourth.png',
    number: '1 1034 00183 78 1',
    fullNameTh: 'นาย คุณธรรม พิพัฒน์ธรรมคุณ',
    firstNameEn: 'Mr. Khunnatham',
    lastNameEn: 'Phiphatthammakhun',
    birthTh: '26 เม.ย. 2549',
    birthEn: '26 Apr. 2006',
    address: 'ที่อยู่ 274 ถ.พหลแสน ต.ในเมือง อ.เมืองนครราชสีมา จ.นครราชสีมา',
    issueTh: '14 พ.ค. 2569',
    issueEn: '14 May 2026',
    expiryTh: '25 เม.ย. 2578',
    expiryEn: '25 Apr. 2035',
    photoCode: '1007-02-05141529',
    front: {
      small: '/images/card-front-4.png',
      large: '/images/card-front-4.png',
    },
    back: {
      small: '/images/card-back-4.png',
      large: '/images/card-back-4.png',
    },
  },
  fifth: {
    ...firstCard,
    ...liveCard,
    portrait: '/images/alpha/portrait-fifth.png',
    number: '1 3099 03616 07 0',
    fullNameTh: 'นาย ธนันท์รัฐ วัฒนสินศักดิ์',
    firstNameEn: 'Mr. Tananrat',
    lastNameEn: 'Watthanasinsak',
    birthTh: '13 ต.ค. 2549',
    birthEn: '13 Oct. 2006',
    address: 'ที่อยู่ 65/25 ถ.วิทยุ แขวงลุมพินี เขตปทุมวัน กรุงเทพมหานคร',
    issueTh: '28 ต.ค. 2569',
    issueEn: '28 Oct. 2026',
    expiryTh: '12 ต.ค. 2578',
    expiryEn: '12 Oct. 2035',
    photoCode: '1006-04-10281519',
    front: {
      small: '/images/card-front-5.png',
      large: '/images/card-front-5.png',
    },
    back: {
      small: '/images/card-back-5.png',
      large: '/images/card-back-5.png',
    },
  },
  sixth: { ...firstCard, ...liveCard, number: '6 6666 66666 66 6', fullNameTh: 'นาย ผู้ใช้งาน คนที่หก', firstNameEn: 'Mr. Sixth', lastNameEn: 'User', photoCode: '0000-00-00000006' },
  seventh: { ...firstCard, ...liveCard, number: '7 7777 77777 77 7', fullNameTh: 'นาย ผู้ใช้งาน คนที่เจ็ด', firstNameEn: 'Mr. Seventh', lastNameEn: 'User', photoCode: '0000-00-00000007' },
  eighth: {
    ...firstCard,
    ...liveCard,
    portrait: '/images/alpha/portrait-eighth.png',
    number: '1 1017 00437 68 0',
    fullNameTh: 'น.ส. วีริณฒิรา วงศ์ธนินยา',
    firstNameEn: 'Miss veryntira',
    lastNameEn: 'Wongthaninya',
    birthTh: '23 ต.ค. 2549',
    birthEn: '23 Oct. 2006',
    address: 'ที่อยู่ 224/14 หมู่ที่ 2 ต.บางขุนกอง อ.บางกรวย\nจ.นนทบุรี',
    issueTh: '22 เม.ย. 2567',
    issueEn: '22 Apr. 2024',
    expiryTh: '22 ต.ค. 2575',
    expiryEn: '22 Oct. 2032',
    photoCode: '1040-02-04221656',
    front: {
      small: '/images/card-front-8.png',
      large: '/images/card-front-8.png',
    },
    back: {
      small: '/images/card-back-8.png',
      large: '/images/card-back-8.png',
    },
  },
  ninth: {
    ...firstCard,
    ...liveCard,
    number: '9 9999 99999 99 9',
    fullNameTh: 'นาย ผู้ใช้งาน คนที่เก้า',
    firstNameEn: 'Mr. Ninth',
    lastNameEn: 'User',
    photoCode: '0000-00-00000009',
    back: {
      small: '/images/card-back-9.png',
      large: '/images/card-back-9.png',
    },
    backOverlay: { text: 'JC4-1777510-20', x: 50.69, y: 66.5, size: 6.975, align: 'center' as const, color: '#8d8d8d' },
  },
  tenth: {
    ...firstCard,
    ...liveCard,
    portrait: '/images/alpha/portrait-tenth.png',
    number: '2 1203 01029 97 6',
    fullNameTh: 'นาย ศิวกร สุสัมพันธ์ไพบูลย์',
    firstNameEn: 'Mr. Siwakorn',
    lastNameEn: 'Susumpanpaiboon',
    birthTh: '18 ธ.ค. 2548',
    birthEn: '18 Dec. 2005',
    address: 'ที่อยู่ 203 หมู่ที่ 3 ต.บางรักพัฒนา อ.บางบัวทอง จ.นนทบุรี',
    issueTh: '13 พ.ค. 2567',
    issueEn: '13 May 2024',
    expiryTh: '17 ธ.ค. 2575',
    expiryEn: '17 Dec. 2032',
    photoCode: '1298-03-05131331',
    front: {
      small: '/images/card-front-1-id.png',
      large: '/images/card-front-1-id.png',
    },
    back: {
      small: '/images/card-back-1-id.png',
      large: '/images/card-back-1-id.png',
    },
  },
} as const

export const sections = {
  services: 'เมนูบริการ',
  announcements: 'ประกาศทั้งหมด',
  seeAll: 'ทั้งหมด',
}

export const services = [
  { id: 'check', label: 'ตรวจสอบ\nคำขอ', disabled: false },
  { id: 'certify', label: 'การรับรองเอกสาร', disabled: false },
  { id: 'move', label: 'การแจ้งย้ายที่อยู่', disabled: false },
  { id: 'soon', label: 'เร็วๆ นี้', disabled: true },
] as const

export const banners = [
  { src: '/images/banner-memorial.png', title: 'สถิตอยู่ในใจตราบนิรันดร์', bleed: null },
  {
    src: '/images/banner-registration.png',
    title: 'บริการทะเบียนออนไลน์',
    // Placement (% of the 4:1 banner box) that maps the artwork's blue panel onto the box so the cards poke out above it
    bleed: { left: -0.254, top: -17.03, width: 100.38, height: 118.13 },
  },
] as { src: string; title: string; bleed: { left: number; top: number; width: number; height: number } | null }[]

export const announcementPage = {
  title: 'ประกาศ',
  back: 'ย้อนกลับ',
}

// Only announcements with a `detail` open the "ประกาศ" detail screen; the rest stay disabled in the list.
export const announcements = [
  {
    title: 'เชิญชวนผู้มีสิทธิเลือกตั้ง/ประชามติ ไปใช้สิทธิ',
    date: '6/02/2569',
    body: 'กรมการปกครองขอเชิญชวนผู้มีสิทธิเลือกตั้ง ส.ส. และออกเสียงประชามติ ไปใช้สิทธิ ในวันอาทิตย์ที่ 8 กุมภาพันธ์ พ.ศ. 2569 เวลา 8.00 - 17.00 น.',
    detail: {
      heading: 'เชิญชวนผู้มีสิทธิเลือกตั้ง/ประชามติ',
      received: 'ได้รับเมื่อ 6 ก.พ. 69 15:46 น.',
      body: 'กรมการปกครองขอเชิญชวนผู้มีสิทธิเลือกตั้ง ส.ส. และออกเสียงประชามติ ไปใช้สิทธิ ในวันอาทิตย์ที่ 8 กุมภาพันธ์ พ.ศ. 2569 เวลา 8.00 - 17.00 น. สามารถตรวจสอบสิทธิ ได้ที่',
      link: 'https://boraservices.bora.dopa.go.th/election/',
    },
  },
  {
    title: 'แจ้งเตือน!! ระวัง SMS หลอกลวง',
    date: '23/07/2566',
    body: 'กรมการปกครอง ไม่มีนโยบายในการส่งข้อความ SMS ไปยังประชาชนแต่อย่างใด โดยขอประชาสัมพันธ์ ห้ามกดลิงก์ที่แนบมากับข้อความที่ไม่น่าเชื่อถือ',
    detail: {
      heading: 'แจ้งเตือน!! ระวัง SMS หลอกลวง',
      received: 'ได้รับเมื่อ 23 ก.ค. 66 17:08 น.',
      body: 'กรมการปกครอง ไม่มีนโยบายในการส่งข้อความ SMS ไปยังประชาชนแต่อย่างใด โดยขอประชาสัมพันธ์ ห้ามกดลิงก์ที่แนบมากับ SMS โดยเด็ดขาด!!! ดูรายละเอียดเพิ่มเติมที่เฟสบุ๊ค dopa fanpage',
    },
  },
  {
    title: 'BORA WEB PORTAL',
    date: '13/05/2566',
    body: 'ระบบการให้บริการงานทะเบียนออนไลน์ ผ่านเว็บไซต์ https://thportal.bora.dopa.go.th โดยยืนยันตัวตนผ่านแอปพลิเคชัน ThaID',
    detail: {
      heading: 'BORA WEB PORTAL',
      received: 'ได้รับเมื่อ 13 พ.ค. 66 15:36 น.',
      body: 'ระบบการให้บริการงานทะเบียนออนไลน์ ผ่านเว็บไซต์',
      link: 'https://thportal.bora.dopa.go.th',
      afterLink: 'โดยยืนยันตัวตนผ่านแอปพลิเคชัน ThaID',
    },
  },
  {
    title: 'ระบบให้บริการประชาชนด้วย ThaID',
    date: '26/04/2566',
    body: 'รวมช่องทาง ระบบที่ให้บริการประชาชนที่เข้าสู่ระบบด้วย แอป ThaID ได้ที่ https://www.bora.dopa.go.th/thaid_authen_services/',
    detail: {
      heading: 'ระบบให้บริการประชาชนด้วย ThaID',
      received: 'ได้รับเมื่อ 26 เม.ย. 66 10:40 น.',
      body: 'รวมช่องทาง ระบบที่ให้บริการประชาชนที่เข้าสู่ระบบด้วย แอป ThaID ได้ที่',
      link: 'https://www.bora.dopa.go.th/thaid_authen_services/',
    },
  },
  {
    title: 'ชื่อแอปพลิเคชันใหม่ ThaID',
    date: '14/03/2566',
    body: 'ยกระดับการให้บริการผ่านการพัฒนาระบบการพิสูจน์และยืนยันตัวตนทางดิจิทัล จาก "D.DOPA" เป็น "ThaID" รองรับประชาชนคนไทยทั้งประเทศ',
    detail: {
      heading: 'ชื่อแอปพลิเคชันใหม่ ThaID',
      received: 'ได้รับเมื่อ 14 มี.ค. 66 07:21 น.',
      body: 'ยกระดับการให้บริการผ่านการพัฒนาระบบการพิสูจน์และยืนยันตัวตนทางดิจิทัล จาก "D.DOPA" เป็น "ThaID" รองรับประชาชนคนไทยทั้งประเทศ',
    },
  },
  {
    title: 'กรณีลืมรหัสผ่าน',
    date: '20/01/2566',
    body: 'หากลืมรหัสผ่าน สามารถสร้างรหัสผ่านใหม่ได้ โดยถ่ายรูปภาพใบหน้าตนเอง หากตรวจสอบแล้วเป็นเจ้าของไอดีจริง จะสามารถตั้งรหัสผ่านใหม่ได้',
    detail: {
      heading: 'กรณีลืมรหัสผ่าน',
      received: 'ได้รับเมื่อ 20 ม.ค. 66 14:32 น.',
      body: 'หากลืมรหัสผ่าน สามารถสร้างรหัสผ่านใหม่ได้ โดยถ่ายรูปภาพใบหน้าตนเอง หากตรวจสอบแล้วเป็นเจ้าของไอดีจริง จะสามารถสร้างรหัสผ่านใหม่ได้',
    },
  },
]

export const appName = 'MyApp'

export const notificationsPage = {
  title: 'แจ้งเตือนทั้งหมด',
  emptyTitle: 'ไม่มีการแจ้งเตือน',
  emptySub: 'ยังไม่มี การแจ้งเตือนใด ๆ',
}

// The "ตรวจสอบคำขอ" (check requests) screen shows the signed-in profile's own name and photo.
// Name comes from cardProfiles[id].fullNameTh; photo from profiles[id].avatar, falling back to the first profile's photo below.
export const checkRequestsPage = {
  title: 'ตรวจสอบคำขอ',
  heading: 'ตรวจสอบคำขอทางออนไลน์',
  profile: {
    photo: {
      src: '/images/check-request-source.png',
      natural: { width: 656, height: 1330 },
      crop: { x: 217, y: 255, width: 96, height: 96 },
    },
  },
  greeting: {
    title: 'สวัสดีครับ',
    sub: 'ขอให้วันนี้เป็นวันที่ดีและสดใสทั้งวันนะครับ',
  },
  requests: [
    { id: 'certify', title: 'การคัดรับรองเอกสาร', empty: 'ไม่มีรายการ' },
    { id: 'person', title: 'การแก้ไขรายการบุคคล', empty: 'ไม่มีรายการ' },
    { id: 'move', title: 'การแจ้งย้ายที่อยู่', empty: 'ไม่มีรายการ' },
  ],
  copyright: 'สงวนลิขสิทธิ์ © 2566',
  agency: 'สำนักบริหารการทะเบียน กรมการปกครอง',
  version: '2.2.4',
} as const

// The "การรับรองเอกสาร" (certify documents) screen reuses the signed-in profile's name and photo like the check screen.
export const certifyPage = {
  title: 'การรับรองเอกสาร',
  heading: 'การคัดรับรองเอกสาร',
  sectionTitle: 'ทะเบียนราษฎร',
  documents: [
    { id: 'person', title: 'คัดรับรองรายการบุคคล (ท.ร.14/1)', sub: 'รายการทะเบียนราษฎร' },
    { id: 'history', title: 'คัดรับรองรายการประวัติบุคคล (ท.ร.12/2)', sub: 'ข้อมูลทะเบียนประวัติราษฎร' },
    { id: 'birth', title: 'ทะเบียนการเกิด (ท.ร.1/ก)', sub: 'รายการทะเบียนคนเกิด (สูติบัตร)' },
  ],
  notice: 'เลือกเอกสารที่ต้องการคัดรับรอง',
} as const

// The "การแจ้งย้ายที่อยู่" (move address) screen. The emblem is cropped from the provided screenshot.
export const movePage = {
  title: 'การแจ้งย้ายที่อยู่',
  cardTitle: 'การแจ้งย้ายที่อยู่ด้วยตนเอง',
  label: 'ระบุเลขประจำตัวประชาชนเจ้าบ้าน (ย้ายเข้า)',
  placeholder: 'ระบุเลขประจำตัวประชาชน',
  send: 'ส่งคำร้องขอเจ้าบ้าน',
  reset: 'ทำรายการใหม่',
  statusLabel: 'สถานะ :',
  statusEmpty: 'กรุณาระบุเลขประจำตัวประชาชนเจ้าบ้าน (ย้ายเข้า)',
  statusReady: 'พร้อมส่งคำร้องขอเจ้าบ้าน',
  statusSent: 'ส่งคำร้องขอเจ้าบ้านแล้ว รอการตอบรับ',
  book: {
    code: 'ท.ร.14',
    title: 'สำเนาทะเบียนบ้าน',
    agency: 'กรมการปกครอง',
    ministry: 'กระทรวงมหาดไทย',
    emblem: {
      src: '/images/move-source.png',
      natural: { width: 644, height: 1372 },
      crop: { x: 262, y: 968, width: 128, height: 136 },
    },
  },
} as const

export const logoutDialog = {
  title: 'แจ้งเตือน',
  message: 'คุณต้องการออกจากระบบใช่หรือไม่?',
  confirm: 'ใช่',
  cancel: 'ไม่',
}

export const cardInfo = {
  title: 'ข้อมูลบัตร',
  photoTitle: 'รูปหน้าบัตร',
  photoSub: 'รูปหน้าบัตรประจำตัวประชาชน',
  numberLabel: 'เลขประจำตัวประชาชน',
  number: '1-2345-67890-12-3',
  nameTh: 'นาย ชื่อ นามสกุล',
  nameEn: 'Mr. Firstname  Lastname',
  addressLabel: 'ที่อยู่',
  address: '123/45 ถนนตัวอย่าง แขวงตัวอย่าง เขตตัวอย่าง กรุงเทพมหานคร',
  birthLabel: 'เกิดวันที่',
  birth: '1 ม.ค. 2540',
  issueLabel: 'วันที่ออกบัตร',
  issue: '1 ม.ค. 2567',
  expiryLabel: 'วันที่หมดอายุ',
  expiry: '1 ม.ค. 2575',
}

const firstCardInfo = {
  ...cardInfo,
  photo: '/images/card-photo.png',
  number: '1-3099-03735-85-1',
  nameTh: 'นาย ไอย์ณพงศ์ ริ้วศรีกุล',
  nameEn: 'Mr. Ainapong  Riewsrikul',
  address: '376 ซ.มิตรภาพ 15 ต.ในเมือง อ.เมืองนครราชสีมา จ.นครราชสีมา',
  birth: '19 พ.ย. 2548',
  issue: '19 ธ.ค. 2567',
  expiry: '18 พ.ย. 2576',
}

export const cardInfoProfiles = {
  first: { ...firstCardInfo, birth: '19 พ.ย. 2549' },
  second: {
    ...firstCardInfo,
    photo: '/images/card-photo-2.png',
    number: '1-1014-02398-10-4',
    nameTh: 'นาย ภัทรชนน รัตธนภาส',
    nameEn: 'Mr. Phatchanon  Ratthanaphas',
    address: '9/139 ซ.พหลโยธิน 9 ถ.พหลโยธิน แขวงพญาไท เขตพญาไท กรุงเทพมหานคร',
    birth: '15 เม.ย. 2549',
    issue: '25 พ.ค. 2567',
    expiry: '14 เม.ย. 2576',
  },
  third: {
    ...firstCardInfo,
    photo: '/images/card-photo-3.png',
    number: '1-1008-01640-48-0',
    nameTh: 'นาย ธรรมเชษฐ์ เชาว์วิศวชัย',
    nameEn: 'Mr. Tamachate  Chaovisawachai',
    address: '217/9 ซ.ประชาอุทิศ 33 แยก 7 แขวงบางมด เขตทุ่งครุ กรุงเทพมหานคร',
    birth: '29 ต.ค. 2549',
    issue: '27 ต.ค. 2569',
    expiry: '28 ต.ค. 2578',
  },
  fourth: {
    ...firstCardInfo,
    photo: '/images/user-4-photo.jpg',
    number: '1-1034-00183-78-1',
    nameTh: 'นาย คุณธรรม พิพัฒน์ธรรมคุณ',
    nameEn: 'Mr. Khunnatham  Phiphatthammakhun',
    address: '274 ถ.พหลแสน ต.ในเมือง อ.เมืองนครราชสีมา จ.นครราชสีมา',
    birth: '26 เม.ย. 2549',
    issue: '14 พ.ค. 2569',
    expiry: '25 เม.ย. 2578',
  },
  fifth: {
    ...firstCardInfo,
    photo: '/images/user-5-photo.jpg',
    number: '1-3099-03616-07-0',
    nameTh: 'นาย ธนันท์รัฐ วัฒนสินศักดิ์',
    nameEn: 'Mr. Tananrat  Watthanasinsak',
    address: '65/25 ถ.วิทยุ แขวงลุมพินี เขตปทุมวัน กรุงเทพมหานคร',
    birth: '13 ต.ค. 2549',
    issue: '28 ต.ค. 2569',
    expiry: '12 ต.ค. 2578',
  },
  sixth: { ...firstCardInfo, number: '6-6666-66666-66-6', nameTh: 'นาย ผู้ใช้งาน คนที่หก', nameEn: 'Mr. Sixth User' },
  seventh: { ...firstCardInfo, number: '7-7777-77777-77-7', nameTh: 'นาย ผู้ใช้งาน คนที่เจ็ด', nameEn: 'Mr. Seventh User' },
  eighth: {
    ...firstCardInfo,
    photo: '/images/alpha/portrait-eighth.png',
    number: '1-1017-00437-68-0',
    nameTh: 'น.ส. วีริณฒิรา วงศ์ธนินยา',
    nameEn: 'Miss veryntira  Wongthaninya',
    address: '224/14 หมู่ที่ 2 ต.บางขุนกอง อ.บางกรวย จ.นนทบุรี',
    birth: '23 ต.ค. 2549',
    issue: '22 เม.ย. 2567',
    expiry: '22 ต.ค. 2575',
  },
  ninth: { ...firstCardInfo, number: '9-9999-99999-99-9', nameTh: 'นาย ผู้ใช้งาน คนที่เก้า', nameEn: 'Mr. Ninth User' },
  tenth: {
    ...firstCardInfo,
    photo: '/images/card-photo-siwakorn.png',
    number: '2-1203-01029-97-6',
    nameTh: 'นาย ศิวกร สุสัมพันธ์ไพบูลย์',
    nameEn: 'Mr. Siwakorn  Susumpanpaiboon',
    address: '203 หมู่ที่ 3 ต.บางรักพัฒนา อ.บางบัวทอง จ.นนทบุรี',
    birth: '18 ธ.ค. 2548',
    issue: '13 พ.ค. 2567',
    expiry: '17 ธ.ค. 2575',
  },
} as const

export const chat = {
  title: 'แชทบอท',
  badge: 'Bot',
  greeting: 'สวัสดีครับ/ค่ะ ยินดีต้อนรับสู่ระบบให้บริการอัตโนมัติ เราพร้อมให้ความช่วยเหลือและตอบข้อสงสัยของท่าน',
  reply: 'ขอบคุณสำหรับข้อความ เจ้าหน้าที่จะติดต่อกลับโดยเร็วที่สุด',
  placeholder: 'พิมพ์ข้อความ...',
}

export const documentsPage = {
  title: 'เอกสาร',
  heading: 'รวมเอกสารที่เกี่ยวข้อง',
  sub: 'แสดงรายการเอกสารทั้งหมด',
  // tone: blue | green | red
  groups: [
    [{ id: 'idcard', title: 'บัตรประจำตัวประชาชน', sub: 'บัตรประจำตัวประชาชน', tone: 'blue' }],
    [
      { id: 'house', title: 'ทะเบียนบ้าน', sub: 'ข้อมูลทะเบียนบ้าน', tone: 'green' },
      { id: 'birth', title: 'สูติบัตร', sub: 'ข้อมูลการเกิด สถานที่เกิด บิดา มารดา', tone: 'green' },
    ],
    [
      { id: 'marriage', title: 'ทะเบียนสมรส', sub: 'ทะเบียนการสมรส', tone: 'red' },
      { id: 'divorce', title: 'ทะเบียนหย่า', sub: 'ทะเบียนการหย่า', tone: 'red' },
    ],
    [{ id: 'disability', title: 'บัตรประจำตัวคนพิการ', sub: 'บัตรประจำตัวคนพิการ', tone: 'blue' }],
    [
      { id: 'license', title: 'ใบอนุญาตอาวุธปืน แบบ ป.4', sub: 'รายการใบอนุญาตให้มีและใช้อสวุธปืน (แบบ ป.4)', tone: 'blue' },
      { id: 'other', title: 'ใบอนุญาตอาวุธปืน แบบ ป.3', sub: 'รายการใบอนุญาตให้มีและใช้อสวุธปืน (แบบ ป.3)', tone: 'blue' },
    ],
  ],
} as const

export const documentNotFoundDialog = {
  title: 'ไม่พบข้อมูลในระบบ',
  code: 'TC-037',
  confirm: 'ตกลง',
  messages: {
    house: 'ไม่พบข้อมูลทะเบียนบ้านในระบบ',
    birth: 'ไม่พบข้อมูลสูติบัตรในระบบ',
    marriage: 'ไม่พบข้อมูลเอกสารการสมรสในระบบ',
    divorce: 'ไม่พบข้อมูลเอกสารการหย่าในระบบ',
    disability: 'ไม่พบข้อมูลบัตรประจำตัวคนพิการในระบบ',
    other: 'ไม่พบข้อมูลเอกสารอื่น ๆ ในระบบ',
  },
} as const

export const historyPage = {
  title: 'ประวัติการทำรายการ',
  groups: [
    {
      date: '12 ตุลาคม พ.ศ. 2569',
      items: [
        { title: 'ยืนยันตัวตน', status: 'ยินยอม', body: 'ยืนยันตัวตนแพลตฟอร์ม App 01 มีการร้องขอให้ท่านยืนยันตัวตน' },
        { title: 'ยืนยันตัวตน', status: 'ยินยอม', body: 'แพลตฟอร์ม App 02 มีการร้องขอให้ท่านยืนยันตัวตน' },
      ],
    },
    {
      date: '1 กันยายน พ.ศ. 2569',
      items: [
        { title: 'ยืนยันตัวตน', status: 'ยินยอม', body: 'ระบบตัวอย่าง มีการร้องขอให้ท่านยืนยันตัวตน' },
        { title: 'ยืนยันตัวตน', status: 'ยินยอม', body: 'ระบบตัวอย่าง มีการร้องขอให้ท่านยืนยันตัวตน' },
      ],
    },
    {
      date: '15 กรกฎาคม พ.ศ. 2569',
      items: [{ title: 'ยืนยันตัวตน', status: 'ยินยอม', body: 'ระบบตัวอย่าง มีการร้องขอให้ท่านยืนยันตัวตน' }],
    },
  ],
}

export const settingsPage = {
  title: 'การตั้งค่า',
  heading: 'ปรับแต่งฟังก์ชันของแอปพลิเคชัน',
  sub: 'จัดการรหัสผ่าน การเข้าถึง ปรับแต่งสิทธิ์',
  changePin: { title: 'เปลี่ยนรหัสผ่าน', sub: 'เปลี่ยนรหัสผ่านในรูปแบบ PIN' },
  biometric: { title: 'ใช้งานด้วยอัตลักษณ์บุคคล', sub: 'การเข้าถึงด้วยอัตลักษณ์ เช่น ลายนิ้วมือ ใบหน้า' },
  notifications: { title: 'การแจ้งเตือน', sub: `รายละเอียดอื่น ๆ ของ แอปพลิเคชัน ${appName}` },
  registration: { title: 'ประวัติการลงทะเบียน', sub: 'ประวัติการลงทะเบียนในอุปกรณ์ที่ผ่านมา' },
  about: { title: 'เกี่ยวกับ', sub: 'เวอร์ชัน 1.0.0 (100001)' },
  moveDevice: { title: 'ย้ายอุปกรณ์', sub: 'แสดง QR Code สำหรับย้ายไปยังอุปกรณ์ใหม่' },
  trust: { title: 'จัดการ Trust Application', sub: 'ให้สิทธิการเข้าถึงโดยไม่ยืนยันตัวตนเพิ่มเติม' },
  deactivate: { title: 'ยกเลิกการใช้งาน', sub: `ยกเลิกการใช้งาน แอปพลิเคชัน ${appName}` },
  logout: { title: 'ออกจากระบบ', sub: 'ออกจากระบบบนอุปกรณ์นี้' },
}

export const nav = {
  home: 'หน้าหลัก',
  docs: 'เอกสาร',
  scan: 'สแกน',
  history: 'ประวัติ',
  settings: 'ตั้งค่า',
}
