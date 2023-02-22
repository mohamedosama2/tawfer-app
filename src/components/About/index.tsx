import styles from "./About.module.scss";
function About() {
  return (
    <div className={styles.About}>
      <section>
        <img
          alt="about"
          src="https://raw.githubusercontent.com/ElzeroWebSchool/HTML_And_CSS_Template_Three/main/imgs/hosting-professional.png"
        />
        <p className="font-body">
          يساعد التطبيق في توفير المال لأنه يتتبع ارتفاع الأسعار ويساعد الأشخاص
          على اختيار منتجات أقل سعرًا ويرسل إشعارًا إلى الأشخاص إذا تم تسجيل
          عنصر بسعر أرخص.
        </p>
      </section>
    </div>
  );
}

export default About;
