import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {AuditoriaLogin, AuditoriaLoginRelations, Usuario} from '../models';
import {UsuarioRepository} from './usuario.repository';

export class AuditoriaLoginRepository extends DefaultCrudRepository<
  AuditoriaLogin,
  typeof AuditoriaLogin.prototype._id,
  AuditoriaLoginRelations
> {

  public readonly usuario: BelongsToAccessor<Usuario, typeof AuditoriaLogin.prototype._id>;

  public readonly usuarios: HasManyRepositoryFactory<Usuario, typeof AuditoriaLogin.prototype._id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>,
  ) {
    super(AuditoriaLogin, dataSource);
    this.usuarios = this.createHasManyRepositoryFactoryFor('usuarios', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuarios', this.usuarios.inclusionResolver);
    this.usuario = this.createBelongsToAccessorFor('usuario', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuario', this.usuario.inclusionResolver);
  }
}
