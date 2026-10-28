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
  fourth: { greeting: 'สวัสดี', status: 'ONLINE', name: 'คุณ ผู้ใช้งานคนที่สี่' },
  fifth: { greeting: 'สวัสดี', status: 'ONLINE', name: 'คุณ ผู้ใช้งานคนที่ห้า' },
  sixth: { greeting: 'สวัสดี', status: 'ONLINE', name: 'คุณ ผู้ใช้งานคนที่หก' },
  seventh: { greeting: 'สวัสดี', status: 'ONLINE', name: 'คุณ ผู้ใช้งานคนที่เจ็ด' },
  eighth: { greeting: 'สวัสดี', status: 'ONLINE', name: 'คุณ ผู้ใช้งานคนที่แปด' },
  ninth: { greeting: 'สวัสดี', status: 'ONLINE', name: 'คุณ ผู้ใช้งานคนที่เก้า' },
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

// The first PIN (11111111) is the template: every other profile inherits it and overrides only identity fields.
export type CardSeal = {
  /** Circle centre, % of card width / height */
  x: number
  y: number
  /** Circle diameter, % of card width */
  size: number
  /** Direction (deg) the rainbow band travels across this circle */
  angle: number
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

export const cardProfiles = {
  first: firstCard,
  second: {
    ...firstCard,
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
    seals: providedCardSeals,
    front: {
      small: '/images/card-front-2-provided.png',
      large: '/images/card-front-2-provided.png',
    },
    back: { small: '/images/card-back-2-640.png', large: '/images/card-back-2-1100.png' },
  },
  third: {
    ...firstCard,
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
    seals: providedCardSeals,
    front: {
      small: '/images/card-front-3-provided.png',
      large: '/images/card-front-3-provided.png',
    },
    back: { small: '/images/card-back-3.png', large: '/images/card-back-3.png' },
  },
  fourth: { ...firstCard, number: '4 4444 44444 44 4', fullNameTh: 'นาย ผู้ใช้งาน คนที่สี่', firstNameEn: 'Mr. Fourth', lastNameEn: 'User', photoCode: '0000-00-00000004' },
  fifth: { ...firstCard, number: '5 5555 55555 55 5', fullNameTh: 'นาย ผู้ใช้งา��� คนที่ห้า', firstNameEn: 'Mr. Fifth', lastNameEn: 'User', photoCode: '0000-00-00000005' },
  sixth: { ...firstCard, number: '6 6666 66666 66 6', fullNameTh: 'นาย ผู้ใช้งาน คนที่หก', firstNameEn: 'Mr. Sixth', lastNameEn: 'User', photoCode: '0000-00-00000006' },
  seventh: { ...firstCard, number: '7 7777 77777 77 7', fullNameTh: 'นาย ผู้ใช้งาน คนที่เจ็ด', firstNameEn: 'Mr. Seventh', lastNameEn: 'User', photoCode: '0000-00-00000007' },
  eighth: { ...firstCard, number: '8 8888 88888 88 8', fullNameTh: 'นาย ผู้ใช้งาน คนที่แป���', firstNameEn: 'Mr. Eighth', lastNameEn: 'User', photoCode: '0000-00-00000008' },
  ninth: { ...firstCard, number: '9 9999 99999 99 9', fullNameTh: 'นาย ผู้ใช้งาน คนที่เก้า', firstNameEn: 'Mr. Ninth', lastNameEn: 'User', photoCode: '0000-00-00000009' },
} as const

export const sections = {
  services: 'เมนูบริการ',
  announcements: 'ประกาศท��้งหมด',
  seeAll: 'ทั้งหมด',
}

export const services = [
  { id: 'check', label: 'ตรวจสอบคำขอ', disabled: false },
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

export const announcements = [
  {
    title: 'เชิญชวนผู้มีสิทธิเลือกตั้ง/ประชามติ ไปใช้สิทธิ',
    date: '6/02/2569',
    body: 'กรมการปกครองขอเชิญชวนผู้มีสิทธิเลือกตั้ง ส.ส. และออกเสียงประชามติ ไปใช้สิทธิ ในวันอาทิตย์ที่ 8 กุมภาพันธ์ พ.ศ. 2569 เวลา 8.00 - 17.00 น.',
  },
  {
    title: 'แจ้งเตือน!! ระวัง SMS หลอกลวง',
    date: '23/07/2566',
    body: 'กรมการปกครอง ไม่มีนโยบายในการส่งข้อความ SMS ไปยังประชาชนแต่อย่างใด โดยขอประชาสัมพันธ์ ห้ามกดลิงก์ที่แนบมากับข้อความที่ไม่น่าเชื่อถือ',
  },
  {
    title: 'BORA WEB PORTAL',
    date: '13/05/2566',
    body: 'ระบบการให้บริการงานทะเบียนออนไลน์ ผ่านเว็บไซต์ https://thportal.bora.dopa.go.th โดยยืนยันตัวตนผ่านแอปพลิเคชัน ThaID',
  },
  {
    title: 'ระบบให้บริการประชาชนด้วย ThaID',
    date: '26/04/2566',
    body: 'รวมช่องทาง ระบบที่ให้บริการประชาชนที่เข้าสู่ระบบด้วย แอป ThaID ได้ที่ https://www.bora.dopa.go.th/thaid_authen_services/',
  },
  {
    title: 'ชื่อแอปพลิเคชันใหม่ ThaID',
    date: '14/03/2566',
    body: 'ยกระดับการให้บริการผ่านการพัฒนาระบบพิสูจน์และยืนยันตัวตนทางดิจิทัล จาก "D.DOPA" เป็น "ThaID" รองรับประชาชนคนไทยและชาวต่างชาติ',
  },
  {
    title: 'กรณีลืมรหัสผ่าน',
    date: '20/01/2566',
    body: 'หากลืมรหัสผ่าน สามารถสร้างรหัสผ่านใหม่ได้ โดยถ่ายรูปภาพใบหน้าตนเอง หากตรวจสอบแล้วเป็นเจ้าของไอดีจริง จะสามารถตั้งรหัสผ่านใหม่ได้',
  },
]

export const appName = 'MyApp'

export const notificationsPage = {
  title: 'แจ้งเตือนทั้งหมด',
  emptyTitle: 'ไม่มีการแจ้งเตือน',
  emptySub: 'ยังไม่มี การแจ้งเตือนใด ๆ',
}

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
  birth: '19 พ.ย. 2549',
  issue: '19 ธ.ค. 2567',
  expiry: '18 พ.ย. 2576',
}

export const cardInfoProfiles = {
  first: firstCardInfo,
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
  fourth: { ...firstCardInfo, number: '4-4444-44444-44-4', nameTh: 'นาย ผู้ใช้งาน คนที่สี่', nameEn: 'Mr. Fourth User' },
  fifth: { ...firstCardInfo, number: '5-5555-55555-55-5', nameTh: 'นาย ผู้ใ��้งาน คนที่ห้า', nameEn: 'Mr. Fifth User' },
  sixth: { ...firstCardInfo, number: '6-6666-66666-66-6', nameTh: 'นาย ผู้ใช้งาน คนที่หก', nameEn: 'Mr. Sixth User' },
  seventh: { ...firstCardInfo, number: '7-7777-77777-77-7', nameTh: 'นาย ผู้ใช้งาน คนที่เจ็ด', nameEn: 'Mr. Seventh User' },
  eighth: { ...firstCardInfo, number: '8-8888-88888-88-8', nameTh: 'นาย ผู้ใช้งาน คนที่แปด', nameEn: 'Mr. Eighth User' },
  ninth: { ...firstCardInfo, number: '9-9999-99999-99-9', nameTh: 'นาย ผู้ใช้งาน คนที่เก้า', nameEn: 'Mr. Ninth User' },
} as const

export const chat = {
  title: 'แชทบอท',
  badge: 'Bot',
  greeting: 'สวัสดีครับ/ค่ะ ยินดีต้อนรับสู��ระบบให้บริการอัตโนมัติ เราพร้อมให้ความช่วยเหลือและตอบข้อสงสัย���องท่าน?',
  reply: 'ขอบคุณสำหรับข้อความ เจ้าหน้าที่จะติดต่อกลับโดยเร็วที่สุด',
  placeholder: 'พิมพ์ข้อความ...',
}

export const documentsPage = {
  title: 'เอกสาร',
  heading: 'รวมเอกสารที่เกี่ยวข้อง',
  sub: 'แสดงรายการเอกสารทั้งหมด',
  // tone: blue | green | red
  groups: [
    [{ id: 'idcard', title: 'บัตรประจำตัว', sub: 'บัตรประจำตัว', tone: 'blue' }],
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
      { id: 'license', title: 'ใบอนุญาต', sub: 'รายการใบอนุญาตต่าง ๆ', tone: 'blue' },
      { id: 'other', title: 'เอกสารอื่น ๆ', sub: 'เอกสารเพิ่มเติม', tone: 'blue' },
    ],
  ],
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
