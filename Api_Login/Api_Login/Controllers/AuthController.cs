using Api_Login.DTOs;
using Api_Login.Models;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api_Login.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly LoginDbContext _db;
        public AuthController(LoginDbContext db) => _db = db;

        [HttpPost("login")]
        public async Task<IActionResult> Login(Api_Login.DTOs.LoginRequest req)
        {
            var user = await _db.Usuarios.FirstOrDefaultAsync(u =>
                u.UsuarioLogin == req.Usuario &&
                u.Password == req.Password &&
                u.Activo);

            if (user == null)
                return Unauthorized(new { message = "Credenciales incorrectas" });

            var token = Guid.NewGuid().ToString();

            _db.Sesiones.Add(new Sesion
            {
                Token = token,
                UsuarioId = user.Id,
                CreadoEn = DateTime.Now,
                ExpiraEn = DateTime.Now.AddHours(2)
            });

            await _db.SaveChangesAsync();

            return Ok(new LoginResponse
            {
                Token = token,
                Usuario = user.Nombre
            });
        }

        [HttpGet("validate")]
        public async Task<IActionResult> Validate()
        {
            var auth = Request.Headers.Authorization.ToString();
            var token = auth.Replace("Bearer ", "");

            var sesion = await _db.Sesiones
                .Include(s => s.Usuario)
                .FirstOrDefaultAsync(s => s.Token == token);

            if (sesion == null || sesion.ExpiraEn < DateTime.Now)
                return Unauthorized(new { message = "Sesión inválida" });

            return Ok(new { usuario = sesion.Usuario!.Nombre });
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            var auth = Request.Headers.Authorization.ToString();
            var token = auth.Replace("Bearer ", "");

            var sesion = await _db.Sesiones.FirstOrDefaultAsync(s => s.Token == token);

            if (sesion != null)
            {
                _db.Sesiones.Remove(sesion);
                await _db.SaveChangesAsync();
            }

            return Ok();
        }
    }
}
