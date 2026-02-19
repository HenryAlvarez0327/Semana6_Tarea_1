namespace Api_Login.Models
{
    public class Sesion
    {
        public int Id { get; set; }
        public string Token { get; set; } = "";
        public DateTime CreadoEn { get; set; } = DateTime.Now;
        public DateTime ExpiraEn { get; set; }

        public int UsuarioId { get; set; }
        public Usuario? Usuario { get; set; }
    }
}
