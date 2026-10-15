// Edit any text in the app from this file.

export const profile = {
  greeting: 'สวัสดี',
  status: 'ONLINE',
  name: 'คุณ ชื่อ นามสกุล',
}

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
}

export const sections = {
  services: 'เมนูบริการ',
  announcements: 'ประกาศทั้งหมด',
  seeAll: 'ทั้งหมด',
}

export const services = [
  { id: 'check', label: 'ตรวจสอบคำขอ', disabled: false },
  { id: 'certify', label: 'การรับรองเอกสาร', disabled: false },
  { id: 'move', label: 'การแจ้งย้ายที่อยู่', disabled: false },
  { id: 'soon', label: 'เร็วๆ นี้', disabled: true },
] as const

export const banners = [
  { src: '/images/banner-1.png', title: 'บริการออนไลน์ครบในที่เดียว', sub: 'ยื่นคำขอได้ทุกที่ ทุกเวลา' },
  { src: '/images/banner-2.png', title: 'ข่าวสารและกิจกรรม', sub: 'ติดตามประกาศล่าสุดได้ที่นี่' },
  { src: '/images/banner-1.png', title: 'แบนเนอร์ที่ 3', sub: 'เปลี่ยนรูปและข้อความได้ในไฟล์นี้' },
]

export const announcements = [
  {
    title: 'เชิญชวนผู้มีสิทธิเลือกตั้ง/ประชามติ ไปใช้สิทธิ',
    date: '6/02/2569',
    body: 'ขอเชิญชวนผู้มีสิทธิเลือกตั้งและออกเสียงประชามติ ไปใช้สิทธิตามวันและเวลาที่กำหนด ตรวจสอบรายละเอียดได้ในแอป',
  },
  {
    title: 'ปิดปรับปรุงระบบชั่วคราว',
    date: '1/02/2569',
    body: 'ระบบจะปิดปรับปรุงในวันอาทิตย์ เวลา 00:00 - 04:00 น. ขออภัยในความไม่สะดวก',
  },
]

export const nav = {
  home: 'หน้าหลัก',
  docs: 'เอกสาร',
  scan: 'สแกน',
  history: 'ประวัติ',
  settings: 'ตั้งค่า',
}
